import { generateWidthTires } from '../../helpers/width-button.generator';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { IBotContext, IBotConversation } from '../../bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { updateProductReplyGenerator } from './helpers/func';
import { selectFieldToSearchKeyboard } from './helpers/keyboard';
import {
  findBy,
  findByDescription,
  findByHeight,
  findByID,
  findByName,
  findByPrice,
  findByQuantity,
  findByRadius,
  findByType,
  findByWidth,
} from './helpers/text';
import { heightKeyBoard, quantityKeyBoard, radiusKeyBoard, typeKeyBoard } from '../global/keyboard';
import { ILoggerService } from '../../core/common/interfaces/logger.service.interface';

export class GetProductConversation extends BaseConversation {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_loggerService);
  }

  public getName(): string {
    return 'getProduct';
  }

  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(findBy, {
      reply_markup: {
        keyboard: selectFieldToSearchKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const action = await conversation.waitFor('message');

    if (!action.message.text || action.message.text === 'exit') {
      await ctx.reply('Помилка або exit');
    }

    const data: {
      name?: string;
      description?: string;
      price?: number;
      size?: string;
      quantity?: number;
      type?: string;
    } = {};

    switch (action.message.text) {
      case 'id':
        await ctx.reply(findByID);

        const id = await conversation.waitFor('message');

        if (!id.message.text || id.message.text === 'exit' || isNaN(Number(id.message.text))) {
          await ctx.reply('Помилка ID або exit');
        }

        const product = await conversation.external(() => {
          return this._productService.getById(Number(id.message.text));
        });

        if (!product) {
          await ctx.reply('Нема такого продукту');
          return;
        }

        await ctx.reply(updateProductReplyGenerator({ ...product }), {
          parse_mode: 'HTML',
        });

        return;

      case 'name':
        await ctx.reply(findByName);
        const name = await conversation.waitFor('message');

        if (!name.message.text || name.message.text === 'exit') {
          await ctx.reply('Виходмо не коректні дані або exit.');
          return;
        }

        data['name'] = name.message.text;

        break;

      case 'description':
        await ctx.reply(findByDescription);

        const description = await conversation.waitFor('message');

        if (!description.message.text || description.message.text === 'exit') {
          await ctx.reply('Виходмо не коректні дані або exit.');
          return;
        }

        data['description'] = description.message.text;

        break;

      case 'price':
        await ctx.reply(findByPrice);

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
        await ctx.reply(findByRadius, {
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

        await ctx.reply(findByWidth, {
          reply_markup: {
            keyboard: generateWidthTires(Number(radius.message.text)),
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

        await ctx.reply(findByHeight, {
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
        await ctx.reply(findByQuantity, {
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
        await ctx.reply(findByType, {
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
        await ctx.reply('Сталась помилка або exit, не коректне поле для пошуку');
        return;
    }

    const products = await conversation.external(() => {
      return this._productService.getByFields({ ...data });
    });

    if (!products?.data.length) {
      await ctx.reply('Продуктів не знайдено');
      return;
    }

    for (let i = 0; i < products.data.length; i++) {
      await ctx.reply(updateProductReplyGenerator({ ...products.data[i] }), { parse_mode: 'HTML' });
    }

    return;
  }
}
