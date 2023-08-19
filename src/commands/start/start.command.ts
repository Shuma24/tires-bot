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

import { IProductService } from '../../product/interfaces/product-service.interface';
import { CallbackQueryContext, CommandContext, HearsContext, InlineKeyboard } from 'grammy';
import { InlineKeyboardButton } from 'grammy/types';
import { IBotContext } from '../../tg-bot/interface/bot-context.interface';
import {
  askAboutHeight,
  askAboutRadius,
  askAboutSeasonType,
  askAboutWidth,
  contactsFromMainMenu,
  noTiresLength,
  onlyOnePageTires,
  productDescriptionGenerate,
  workOnYouReq,
} from '../helpers/start-command-text';

export class StartCommand extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_bot.instance, _loggerService);
  }

  handle(): void {
    //sub-command navigation
    this.startCommand();
    this.listenContacts();
    this.xPartGenerate();
    this.seasonMenu();
    this.radiusMenuAndSetSeason();
    this.widthGenerateAndSetRadius();
    this.heightGenerateAndSetWidth();
    this.setHeightAndTriggerDB();
    this.productPaginationCallback();
    this.photoPaginationCallback();
  }

  private startCommand() {
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
  }

  private listenContacts() {
    this.bot.hears('📞 Контакти', (ctx) => {
      ctx.reply(contactsFromMainMenu, {
        parse_mode: 'HTML',
      });
    });
  }

  private xPartGenerate() {
    this.bot.hears('Корисний лінк для авто', (ctx) => {
      ctx.reply('https://xpart.in.ua/');
    });
  }

  private seasonMenu() {
    this.bot.hears('🔍 Підібрати шини', async (ctx) => {
      await ctx.reply(askAboutSeasonType, {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: seasonButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });
  }

  private radiusMenuAndSetSeason() {
    this.bot.hears(typesRegex, async (ctx) => {
      if (!ctx.msg.text) return await ctx.reply('Вийшла помилка спробуйте ще раз');

      const response = handleBackHomeButtons(ctx.msg.text);

      if (response) {
        return await ctx.reply(response.text, {
          reply_markup: {
            keyboard: response.buttons,
            resize_keyboard: true,
          },
        });
      }

      const checkedType = checkType(ctx.msg.text);

      checkedType && (ctx.session.type = checkedType);

      await ctx.reply(askAboutRadius, {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: radiusButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });
  }

  private widthGenerateAndSetRadius() {
    this.bot.hears(radiusRegex, async (ctx) => {
      if (!ctx.msg.text) return await ctx.reply('Вийшла помилка спробуйте ще раз');

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

      ctx.reply(askAboutWidth, {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: widthButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });
  }

  private heightGenerateAndSetWidth() {
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

      ctx.reply(askAboutHeight, {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: heightButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });
  }

  private setHeightAndTriggerDB() {
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

      await ctx.reply(workOnYouReq, {
        parse_mode: 'HTML',
        reply_markup: {
          remove_keyboard: true,
        },
      });

      this.handleProducts(ctx);
    });
  }

  private productPaginationCallback() {
    this.bot.callbackQuery(/page_(\d+)/, async (ctx) => {
      ctx.session.pages = parseInt(ctx.match[1], 10);

      await this.handleProducts(ctx);
    });
  }

  private photoPaginationCallback() {
    this.bot.callbackQuery(/img_(\d+)_(\d+)/, async (ctx) => {
      const productId = parseInt(ctx.match[1], 10);

      const photoIndex = parseInt(ctx.match[2], 10);

      const product = await this._productService.getById(productId);

      if (!product || !product.images) return await ctx.reply('Сталась проблема спробуйте ще раз.');

      const totalPhotos = product.images.length;

      let nextIndex = (photoIndex + 1) % totalPhotos;
      let prevIndex = (photoIndex - 1 + totalPhotos) % totalPhotos;

      const caption = productDescriptionGenerate(
        product.name,
        product.size,
        product.description,
        product.quantity,
        product.price,
      );

      const photoUrl =
        product.images[photoIndex].url ||
        'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

      await ctx.editMessageMedia(
        {
          type: 'photo',
          media: photoUrl,
          caption: caption,
          parse_mode: 'HTML',
        },
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '⬅️ Попереднє', callback_data: `img_${product.id}_${prevIndex}}` },
                { text: 'Наступне ➡️', callback_data: `img_${product.id}_${nextIndex}` },
              ],
              [{ text: `Замовити ${product.name}`, callback_data: `order_${productId}` }],
            ],
          },
        },
      );
    });
  }

  private async handleProducts(ctx: HearsContext<IBotContext> | CallbackQueryContext<IBotContext>) {
    if (!ctx.session.radius || !ctx.session.type || !ctx.session.width || !ctx.session.height) {
      return await ctx.reply('Ви пропустили щось обрати..');
    }

    const size = `${ctx.session.width}/${ctx.session.height}/${ctx.session.radius}`;
    const products = await this._productService.getBySize(size, ctx.session.pages);

    if (!products || !products.data.length) {
      return await ctx.reply(noTiresLength);
    }

    for (let product of products.data) {
      const captionText = productDescriptionGenerate(
        product.name,
        product.size,
        product.description,
        product.quantity,
        product.price,
      );

      let mainButton: InlineKeyboardButton = {
        text: `Замовити ${product.name}`,
        callback_data: `order_${product.id}`,
      };

      let imageButtons: InlineKeyboardButton[] = [];

      if (product.images && product.images.length > 0) {
        let currentImageIndex = 0;
        let nextImageIndex = (currentImageIndex + 1) % product.images.length;

        imageButtons.push({
          text: `Наступне фото 👉🏻`,
          callback_data: `img_${product.id}_${nextImageIndex}`,
        });

        await ctx.replyWithPhoto(
          product.images[0].url ||
            'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
          {
            caption: captionText,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [imageButtons, [mainButton]],
            },
          },
        );
      } else {
        await ctx.reply(captionText, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[mainButton]],
          },
        });
      }
    }

    const buttonRow: InlineKeyboardButton[][] = [];
    if (ctx.session.pages > 0) {
      buttonRow.push([{ text: 'Назад', callback_data: `page_${ctx.session.pages - 1}` }]);
    }

    if (ctx.session.pages < products.lastPage) {
      buttonRow.push([{ text: 'Вперед', callback_data: `page_${ctx.session.pages + 1}` }]);
    }

    if (products.total <= 3) {
      return await ctx.reply(onlyOnePageTires, {
        parse_mode: 'HTML',
      });
    }

    await ctx.reply('Це не все, переглянь наступну сторінку', {
      reply_markup: {
        inline_keyboard: buttonRow,
      },
    });
  }
}

injected(StartCommand, TOKENS.bot, TOKENS.loggerService, TOKENS.productService);
