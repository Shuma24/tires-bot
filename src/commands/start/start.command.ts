import { Command } from '../command';
import { injected } from 'brandi';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';

import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { heightButtons, radiusButtons, seasonButtons, startButtons } from '../helpers/buttons';
import { generateWidthTires } from '../helpers/width-button.generator';
import { heightRegex, radiusRegex, typesRegex, widthRegex } from '../helpers/regexs';
import { checkType } from '../helpers/type-selector';
import { handleBackHomeButtons } from '../helpers/back-home.handle';

export class StartCommand extends Command {
  constructor(protected readonly _bot: IBot, private readonly _loggerService: ILoggerService) {
    super(_bot.instance);

    this._loggerService.info('Start command initialized');
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

    this.bot.hears(heightRegex, async (ctx) => {
      if (!ctx.msg.text) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      ctx.session.height = Number(ctx.msg.text);

      const radius = ctx.session.radius || 21;

      const response = handleBackHomeButtons(ctx.msg.text, radius);

      if (response) {
        return await ctx.reply(response.text, {
          reply_markup: {
            keyboard: response.buttons,
            resize_keyboard: true,
          },
        });
      }

      ctx.reply('Дякую шукаю варіанти', {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    });
  }
}

injected(StartCommand, TOKENS.bot, TOKENS.loggerService);
