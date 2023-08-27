import { injected } from 'brandi';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { IBotContext, IBotConversation } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { TOKENS } from '../../containter/tokens';
import { putID } from '../global/text';
import { deleted } from './helpers/text';

export class DeleteProductConversation extends BaseConversation {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_loggerService);
  }

  public getName(): string {
    return 'delProduct';
  }

  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(putID);

    const productID = await conversation.waitFor(':text');

    if (
      !productID.message?.text ||
      isNaN(Number(productID.message.text)) ||
      productID.message?.text === 'exit'
    ) {
      await ctx.reply('Введено не число або exit');

      return;
    }

    const delResult = await this._productService.delete(Number(productID.message.text));

    if (!delResult) {
      await ctx.reply('Помилка видалення');
      return;
    }

    await ctx.reply(deleted);

    return;
  }
}

injected(DeleteProductConversation, TOKENS.loggerService, TOKENS.productService);
