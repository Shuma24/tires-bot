import { injected } from 'brandi';
import { generateWidthTires } from '../../helpers/width-button.generator';

import { IBotConversation, IBotContext } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { TOKENS } from '../../containter/tokens';
import { IProductRepository } from '../../product/interfaces/product-repository.interface';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';

export class AddProductConversation extends BaseConversation {
  constructor(
    readonly _productRepository: IProductRepository,
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

    if (!name.message.text) {
      await ctx.reply('Ай, вводиш фігню то не текст.');
      return;
    }

    ctx.session.name = name.message.text;

    await ctx.reply('Тепер напиши опис до коліс');

    const description = await conversation.waitFor('message');

    if (!description.message.text) {
      await ctx.reply('Ай, вводиш фігню то не текст.');
      return;
    }

    await ctx.reply('Харош, введи ціну');

    const price = await conversation.waitFor('message');

    if (!price.message.text) {
      await ctx.reply('Ай, вводиш фігню то не текст.');
      return;
    }

    await ctx.reply('Обери будь ласка радіус', {
      reply_markup: {
        keyboard: [[{ text: 'summer' }], [{ text: 'winter' }], [{ text: 'allseason' }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const type = await conversation.waitFor('message');

    if (!type.message.text) {
      await ctx.reply('Ай, вводиш фігню.');
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

    if (!radius.message.text) {
      await ctx.reply('Ай, вводиш фігню.');
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

    if (!width.message.text) {
      await ctx.reply('Ай, вводиш фігню.');
      return;
    }

    await ctx.reply(`Останній вибір, висоти`, {
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

    if (!height.message.text) {
      await ctx.reply('Ай, вводиш фігню.');
      return;
    }

    await ctx.reply('Так я буду створювати продукт, зачекай');

    const product = await conversation.external(() => {
      return this._productRepository.create({
        name: name.message.text as string,
        description: description.message.text as string,
        price: Number(price.message.text) as number,
        type: type.message.text as string,
        radius: Number(radius.message.text) as number,
        width: Number(width.message.text) as number,
        height: Number(height.message.text) as number,
      });
    });

    await ctx.reply(`${product.description}`);

    return;

    /* await ctx.reply('Привіт грузи фотки');

    const { message } = await conversation.waitFor(':photo');

    if (!message?.photo) {
      await ctx.reply('Це не фотографія! Я пішов!');
      return;
    }

    let largestObject = null;
    ctx.session.images = [];

    for (const obj of message.photo) {
      if (!largestObject || (obj.file_size as number) > (largestObject.file_size as number)) {
        largestObject = obj;
      }
    }

    if (largestObject) {
      ctx.session.images.push({
        id: largestObject.file_id,
      });
    }

    if (ctx.session.images.length) await ctx.reply(`${ctx.session.images[0].id}`); */
  }
}

injected(AddProductConversation, TOKENS.productRepository, TOKENS.loggerService);
