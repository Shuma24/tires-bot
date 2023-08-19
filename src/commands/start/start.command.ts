import { Command } from '../command';
import { injected } from 'brandi';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';

import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { heightButtons, radiusButtons, seasonButtons, startButtons } from '../../helpers/buttons';
import { generateWidthTires } from '../../helpers/width-button.generator';
import { heightRegex, radiusRegex, typesRegex, widthRegex } from '../helpers/regexs';
import { checkType } from '../helpers/type-selector';
import { handleBackHomeButtons } from '../helpers/back-home.handle';
import { generateSelection } from '../helpers/generate-selection';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { CallbackQueryContext, CommandContext, HearsContext, InlineKeyboard } from 'grammy';
import { InlineKeyboardButton } from 'grammy/types';
import { IBotContext } from '../../tg-bot/interface/bot-context.interface';

export class StartCommand extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_bot.instance, _loggerService);
  }

  handle(): void {
    this.bot.command('start', async (ctx) => {
      //start generate
      await ctx.reply('Привіт ✌🏻');
      await ctx.reply('Я допоможу тобі із підбором шин до твого 🚗');

      await ctx.reply('Виберіть опцію:', {
        reply_markup: {
          keyboard: startButtons,
          resize_keyboard: true,
        },
      });
    });

    //contacts generate
    this.bot.hears('📞 Контакти', (ctx) => {
      ctx.reply(`Наші номера телефонів: 
      +380XXXXXXXXX 📞;
      +380XXXXXXXXX 📞;
      +380XXXXXXXXX 📞.`);
    });

    //web page generate
    this.bot.hears('Корисний лінк для авто', (ctx) => {
      ctx.reply('https://xpart.in.ua/');
    });

    //types generate
    this.bot.hears('🔍 Підібрати шини', async (ctx) => {
      await ctx.reply('Шини якого сезону Вам потрібні?', {
        reply_markup: {
          keyboard: seasonButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    //radius generate
    this.bot.hears(typesRegex, async (ctx) => {
      const response = handleBackHomeButtons(ctx.msg.text as string);

      if (response) {
        return await ctx.reply(response.text, {
          reply_markup: {
            keyboard: response.buttons,
            resize_keyboard: true,
          },
        });
      }

      const checkedType = checkType(ctx.msg.text as string);

      checkedType && (ctx.session.type = checkedType);

      await ctx.reply('Оберіть ДІАМЕТР', {
        reply_markup: {
          keyboard: radiusButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    // width generate
    this.bot.hears(radiusRegex, async (ctx) => {
      if (!ctx.msg.text) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      const response = handleBackHomeButtons(ctx.msg.text as string);

      if (response) {
        return await ctx.reply(response.text, {
          reply_markup: {
            keyboard: response.buttons,
            resize_keyboard: true,
          },
        });
      }

      const radius = Number(ctx.msg.text.replace(/R/, ''));

      ctx.session.radius = radius;

      const widthButtons = generateWidthTires(radius);

      ctx.reply('Оберіть ШИРИНУ', {
        reply_markup: {
          keyboard: widthButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    //height generate
    this.bot.hears(widthRegex, async (ctx) => {
      if (!ctx.msg.text) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      ctx.session.width = Number(ctx.msg.text);

      const response = handleBackHomeButtons(ctx.msg.text);

      if (response) {
        return await ctx.reply(response.text, {
          reply_markup: {
            keyboard: response.buttons,
            resize_keyboard: true,
          },
        });
      }

      ctx.reply('Оберіть потрібну ВИСОТУ ПРОФІЛЯ', {
        reply_markup: {
          keyboard: heightButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    this.bot.callbackQuery(/page_(\d+)/, async (ctx) => {
      ctx.session.pages = parseInt(ctx.match[1], 10);

      await this.handleProducts(ctx);
    });

    this.bot.hears(heightRegex, async (ctx) => {
      if (!ctx.msg.text) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      ctx.session.height = Number(ctx.msg.text);

      const radius = ctx.session.radius || 21;

      const heightResponse = handleBackHomeButtons(ctx.msg.text, radius);

      if (heightResponse) {
        return await ctx.reply(heightResponse.text, {
          reply_markup: {
            keyboard: heightResponse.buttons,
            resize_keyboard: true,
          },
        });
      }

      if (!ctx.session.radius || !ctx.session.type || !ctx.session.width || !ctx.session.height) {
        return await ctx.reply('Ви пропустили щось обрати..');
      }

      const size = `${ctx.session.width}/${ctx.session.height}/${ctx.session.radius}`;

      await ctx.reply(generateSelection(size, ctx.session.type), {
        parse_mode: 'HTML',
        reply_markup: {
          remove_keyboard: true,
        },
      });

      this.handleProducts(ctx);
    });
  }

  private async handleProducts(ctx: HearsContext<IBotContext> | CallbackQueryContext<IBotContext>) {
    const size = `${ctx.session.width}/${ctx.session.height}/${ctx.session.radius}`;

    const products = await this._productService.getBySize(size, ctx.session.pages);

    if (!products || !products.data.length) {
      await ctx.reply('Нажаль такого розміру немає');
      return;
    }

    const buttonRow: InlineKeyboardButton[][] = [];
    let msg = '';

    products.data.forEach((product) => {
      msg += `${product.name}/${product.size}\n${product.description}\n\n`;
      buttonRow.push([{ text: `Замовити ${product.name}`, callback_data: `order_${product.id}` }]);
    });

    if (ctx.session.pages > 0) {
      buttonRow.push([{ text: 'Назад', callback_data: `page_${ctx.session.pages - 1}` }]);
    }

    if (ctx.session.pages < products.lastPage) {
      buttonRow.push([{ text: 'Вперед', callback_data: `page_${ctx.session.pages + 1}` }]);
    }

    await ctx.reply(msg, {
      reply_markup: {
        inline_keyboard: buttonRow,
      },
    });
  }
}

injected(StartCommand, TOKENS.bot, TOKENS.loggerService, TOKENS.productService);
