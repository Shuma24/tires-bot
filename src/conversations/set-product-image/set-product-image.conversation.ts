import { injected } from 'brandi';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { IBotContext, IBotConversation } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { TOKENS } from '../../containter/tokens';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { putID } from '../global/text';
import { photoCountToUploadKeyboard } from '../global/keyboard';
import { selectCountPhoto } from './helpers/text';

export class SetProductsImageConversation extends BaseConversation {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_loggerService);
  }

  public getName(): string {
    return 'setProductImage';
  }

  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(putID);

    const productID = await conversation.waitFor('message');

    if (
      !productID.message.text ||
      isNaN(Number(productID.message.text)) ||
      productID.message.text === 'exit'
    ) {
      await ctx.reply('Не введено id або exit');
      return;
    }

    await ctx.reply(selectCountPhoto, {
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
          Number(productID.message.text),
        );
      });

      if (!images) {
        await ctx.reply('Помилка при додаванні фото');
        return;
      }

      await ctx.reply(`Фото ${images.id} додано до продукту ${productID.message.text}`);

      i++;
    }

    return;
  }
}

injected(SetProductsImageConversation, TOKENS.loggerService, TOKENS.productService);
