import { generateWidthTires } from '../../helpers/width-button.generator';
import { IProductService } from '../../product/interfaces/product-service.interface';

import { BaseConversation } from '../conversation';
import { updateProductReplyGenerator } from './helpers/func';
import { selectFieldToUpdateKeyboard } from './helpers/keyboard';
import {
  awaitUserID,
  fieldToUpdate,
  setNewDescription,
  setNewHeight,
  setNewName,
  setNewPrice,
  setNewQuantity,
  setNewRadius,
  setNewType,
  setNewWidth,
} from './helpers/text';

import { heightKeyBoard, quantityKeyBoard, radiusKeyBoard, typeKeyBoard } from '../global/keyboard';
import { ILoggerService } from '../../core/common/interfaces/logger.service.interface';
import { IBotContext, IBotConversation } from '../../bot/interface/bot-context.interface';

export class UpdateProductConversation extends BaseConversation {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_loggerService);
  }

  public getName(): string {
    return 'updateProduct';
  }

  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(awaitUserID);

    const productID = await conversation.waitFor(':text');

    if (
      !productID.message?.text ||
      isNaN(Number(productID.message.text)) ||
      productID.message?.text === 'exit'
    ) {
      await ctx.reply('Введено не число або exit');

      return;
    }

    await ctx.reply(fieldToUpdate, {
      reply_markup: {
        keyboard: selectFieldToUpdateKeyboard,
        one_time_keyboard: true,
        remove_keyboard: true,
        resize_keyboard: true,
      },
    });

    const selectedFieldToUpdate = await conversation.waitFor('message');

    if (!selectedFieldToUpdate.message?.text || selectedFieldToUpdate.message.text === 'exit') {
      await ctx.reply('Помилка або exit');

      return;
    }

    const data: {
      name?: string;
      description?: string;
      price?: number;
      size?: string;
      quantity?: number;
      type?: string;
    } = {};

    switch (selectedFieldToUpdate.message.text) {
      case 'name':
        await ctx.reply(setNewName);
        const name = await conversation.waitFor('message');

        if (!name.message.text || name.message.text === 'exit') {
          await ctx.reply('Виходмо не коректні дані або exit.');
          return;
        }

        data['name'] = name.message.text;

        break;

      case 'description':
        await ctx.reply(setNewDescription);

        const description = await conversation.waitFor('message');

        if (!description.message.text || description.message.text === 'exit') {
          await ctx.reply('Виходмо не коректні дані або exit.');
          return;
        }

        data['description'] = description.message.text;

        break;

      case 'price':
        await ctx.reply(setNewPrice);

        const price = await conversation.waitFor('message');

        if (
          !price.message.text ||
          isNaN(Number(price.message.text)) ||
          price.message.text === 'exit'
        ) {
          await ctx.reply('Виходмо не коректні дані або exit.');
          return;
        }

        data['price'] = Number(price.message.text);

        break;

      case 'size':
        await ctx.reply(setNewRadius, {
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

        await ctx.reply(setNewWidth, {
          reply_markup: {
            keyboard: generateWidthTires(Number(radius.message.text), true),
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });

        const width = await conversation.waitFor('message');

        if (
          !width.message.text ||
          isNaN(Number(width.message.text)) ||
          width.message.text === 'exit'
        ) {
          await ctx.reply('Виходмо не коректні дані або exit.');
          return;
        }

        await ctx.reply(setNewHeight, {
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

        data['size'] = `${width.message.text}/${height.message.text}/${radius.message.text}`;

        break;

      case 'quantity':
        await ctx.reply(setNewQuantity, {
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

        data['quantity'] = Number(quantity.message.text);

        break;

      case 'type':
        await ctx.reply(setNewType, {
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

        data['type'] = type.message.text;

        break;

      default:
        await ctx.reply('Сталась помилка або exit, не коректне поле для апдейту');
        return;
    }

    const product = await conversation.external(() => {
      return this._productService.update(data, Number(productID.message.text));
    });

    if (!product) {
      await ctx.reply('Пробелма з апдейтом');
      return;
    }

    await ctx.reply(updateProductReplyGenerator(product), {
      parse_mode: 'HTML',
    });

    return;
  }
}
