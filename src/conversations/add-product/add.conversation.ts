import { injected } from 'brandi';
import { generateWidthTires } from '../../helpers/width-button.generator';

import { IBotConversation, IBotContext } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { TOKENS } from '../../containter/tokens';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { productReplyGenerator } from './helpers/product-reply-generator';
import {
  imageCount,
  isPhotoProduct,
  productDescription,
  productHeight,
  productName,
  productPrice,
  productQuantity,
  productRadius,
  productType,
  productWidth,
  waitForCreate,
} from './helpers/text';
import { heightKeyBoard, photoCountToUploadKeyboard, quantityKeyBoard, radiusKeyBoard, typeKeyBoard } from '../global/keyboard';
import { isAddPhotoKeyboard } from './helpers/keyboard';

export class AddProductConversation extends BaseConversation {
  constructor(
    readonly _productService: IProductService,
    private readonly _loggerService: ILoggerService,
  ) {
    super(_loggerService);
  }

  public getName(): string {
    return 'addProduct';
  }

  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(productName);

    const name = await conversation.waitFor('message');

    if (!name.message.text || name.message.text === 'exit') {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    await ctx.reply(productDescription);

    const description = await conversation.waitFor('message');

    if (!description.message.text || description.message.text === 'exit') {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    await ctx.reply(productPrice);

    const price = await conversation.waitFor('message');

    if (!price.message.text || isNaN(Number(price.message.text)) || price.message.text === 'exit') {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    await ctx.reply(productType, {
      reply_markup: {
        keyboard: typeKeyBoard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const type = await conversation.waitFor('message');

    if (!type.message.text || type.message.text === 'exit') {
      await ctx.reply('Помилка або exit');
      return;
    }

    await ctx.reply(productRadius, {
      reply_markup: {
        keyboard: radiusKeyBoard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const radius = await conversation.waitFor('message');

    if (
      !radius.message.text ||
      isNaN(Number(radius.message.text)) ||
      radius.message.text === 'exit'
    ) {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    await ctx.reply(productWidth, {
      reply_markup: {
        keyboard: generateWidthTires(Number(radius.message.text)),
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const width = await conversation.waitFor('message');

    if (!width.message.text || isNaN(Number(width.message.text)) || width.message.text === 'exit') {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    await ctx.reply(productHeight, {
      reply_markup: {
        keyboard: heightKeyBoard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const height = await conversation.waitFor('message');

    if (
      !height.message.text ||
      isNaN(Number(height.message.text)) ||
      height.message.text === 'exit'
    ) {
      await ctx.reply('Виходмо не коректні дані або exit');
      return;
    }

    await ctx.reply(productQuantity, {
      reply_markup: {
        keyboard: quantityKeyBoard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const quantity = await conversation.waitFor('message');

    if (
      !quantity.message.text ||
      isNaN(Number(quantity.message.text)) ||
      quantity.message.text === 'exit'
    ) {
      await ctx.reply('Виходмо не коректні дані або exit');
      return;
    }

    await ctx.reply(waitForCreate, {
      parse_mode: 'HTML',
    });

    const product = await conversation.external(() => {
      return this._productService.create({
        name: name.message.text as string,
        description: description.message.text as string,
        price: Number(price.message.text),
        type: type.message.text as string,
        radius: Number(radius.message.text),
        width: Number(width.message.text),
        height: Number(height.message.text),
        quantity: Number(quantity.message.text),
      });
    });

    if (!product) {
      await ctx.reply('Помилка при додаванні продукту');
      return;
    }

    await ctx.reply(productReplyGenerator(product), { parse_mode: 'HTML' });

    await ctx.reply(isPhotoProduct, {
      reply_markup: {
        keyboard: isAddPhotoKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const isHavePhoto = await conversation.waitFor('message');

    if (
      !isHavePhoto.message.text ||
      isHavePhoto.message.text === 'Ні' ||
      isHavePhoto.message.text !== 'Так'
    ) {
      await ctx.reply('Ок можна добавити потім');
      return;
    }

    await ctx.reply(imageCount, {
      reply_markup: {
        keyboard: photoCountToUploadKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const count = await conversation.waitFor('message');

    if (
      !count.message.text ||
      isNaN(Number(count.message.text)) ||
      count.message.text === 'exit' ||
      Number(count.message.text) > 5
    ) {
      await ctx.reply('Не число або exit. А також максимум 5 фото');
      return;
    }

    await ctx.reply(`Кидай ${count.message.text} фото`);

    let i = 0;

    while (Number(count.message.text) >= i) {
      const { message } = await conversation.waitFor(':photo');

      if (!message?.photo || message.text === 'exit') {
        await ctx.reply('Проблема або exit');
        return;
      }

      const images = await conversation.external(() => {
        return this._productService.createImage(
          message.photo[message.photo.length - 1].file_id,
          product.id,
        );
      });

      if (!images) {
        await ctx.reply('Помилка при додаванні фото');
        return;
      }

      await ctx.reply(`Фото ${images.id} додано до продукту ${product.id}`);

      i++;
    }

    return;
  }
}

injected(AddProductConversation, TOKENS.productService, TOKENS.loggerService);
