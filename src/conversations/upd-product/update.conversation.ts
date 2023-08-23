import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { IBotContext, IBotConversation } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';

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
    await ctx.reply('Відправ ID продукту для оновлення');

    const productID = await conversation.waitFor(':text');

    if (
      !productID.message?.text ||
      isNaN(Number(productID.message.text)) ||
      productID.message?.text === 'exit'
    ) {
      await ctx.reply('Введено не число або exit');

      return;
    }

    return;
  }
}
