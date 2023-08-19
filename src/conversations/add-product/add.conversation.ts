import { injected } from 'brandi';
import { generateWidthTires } from '../../helpers/width-button.generator';

import { IBotConversation, IBotContext } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { TOKENS } from '../../containter/tokens';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { productReplyGenerator } from './helpers/product-reply-generator';

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
    await ctx.reply('Погнали, введи назву коліс');

    const name = await conversation.waitFor('message');

    if (!name.message.text || name.message.text === 'exit') {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    ctx.session.name = name.message.text;

    await ctx.reply('Тепер напиши опис до коліс');

    const description = await conversation.waitFor('message');

    if (!description.message.text || description.message.text === 'exit') {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    await ctx.reply('Харош, введи ціну');

    const price = await conversation.waitFor('message');

    if (!price.message.text || isNaN(Number(price.message.text)) || price.message.text === 'exit') {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    await ctx.reply('Обери будь ласка тип', {
      reply_markup: {
        keyboard: [[{ text: 'summer' }], [{ text: 'winter' }], [{ text: 'allseason' }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const type = await conversation.waitFor('message');

    if (!type.message.text) {
      await ctx.reply('Ай, вводиш не це.');
      return;
    }

    await ctx.reply(`Супер, певно вже надоїло но ще трішки, тепер обери радіус`, {
      reply_markup: {
        keyboard: [
          [{ text: '13' }, { text: '14' }],
          [{ text: '15' }, { text: '16' }],
          [{ text: '17' }, { text: '18' }],
          [{ text: '19' }, { text: '20' }],
          [{ text: '21' }, { text: '22' }],
        ],
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

    await ctx.reply('Окей, обери ширину', {
      reply_markup: {
        keyboard: generateWidthTires(Number(radius.message.text), true),
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const width = await conversation.waitFor('message');

    if (!width.message.text || isNaN(Number(width.message.text)) || width.message.text === 'exit') {
      await ctx.reply('Виходмо не коректні дані або exit.');
      return;
    }

    await ctx.reply(`Введи, висоту`, {
      reply_markup: {
        keyboard: [
          [{ text: '12.5' }, { text: '25' }, { text: '30' }],
          [{ text: '35' }, { text: '40' }, { text: '45' }],
          [{ text: '50' }, { text: '55' }, { text: '60' }],
          [{ text: '65' }, { text: '70' }, { text: '75' }],
          [{ text: '80' }],
        ],
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

    await ctx.reply(`Введи, кількість`, {
      reply_markup: {
        keyboard: [
          [{ text: '1' }, { text: '2' }],
          [{ text: '3' }, { text: '4' }],
        ],
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

    await ctx.reply('Так я буду створювати продукт, зачекай');

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

    await ctx.reply('Будеш добавляти фото', {
      reply_markup: {
        keyboard: [[{ text: 'Так' }], [{ text: 'Ні' }]],
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

    conversation.session.images = [];

    await ctx.reply('Вибери скільки фото будеш добавляти', {
      reply_markup: {
        keyboard: [[{ text: '1' }, { text: '2' }], [{ text: '3' }, { text: '4' }], [{ text: '5' }]],
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

      await ctx.reply(`Фото ${images.id} додано`);

      i++;
    }

    return;
  }
}

injected(AddProductConversation, TOKENS.productService, TOKENS.loggerService);
