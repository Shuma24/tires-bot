import { injected } from 'brandi';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { IBotContext, IBotConversation } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { createOrderResponse, orderAlert, startOrder, userPhone } from '../helpers/text-reply';
import { TOKENS } from '../../containter/tokens';
import { IProductService } from '../../product/interfaces/product-service.interface';

export class OrderProductsConversation extends BaseConversation {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_loggerService);
  }

  public getName(): string {
    return 'orderProducts';
  }
  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(startOrder, {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [[{ text: 'Скасувати замовлення' }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const name = await conversation.waitFor(':text');

    if (!name.message?.text) {
      await ctx.reply('Сталась помилка спробуйте ще раз');
      return;
    }

    if (name.message?.text === 'Скасувати замовлення') {
      await ctx.reply('Скасовано жми /start');
      return;
    }

    await ctx.reply(userPhone, {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [[{ text: 'Скасувати замовлення' }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    const phone = await conversation.waitFor(':text');

    if (!phone.message?.text || isNaN(Number(phone.message.text))) {
      await ctx.reply('Сталась помилка або введено не номер мобільного телефону');
      return;
    }

    if (phone.message?.text === 'Скасувати замовлення') {
      await ctx.reply('Скасовано жми /start');
      return;
    }

    const product = await conversation.external(() => {
      return this._productService.getById(Number(conversation.session.productOrOrder));
    });

    if (!product) {
      await ctx.reply('Обрано не існуючий продукт, спробуйте ще раз');
      return;
    }

    await ctx.reply(
      createOrderResponse(
        name.message?.text,
        phone.message?.text,
        product.name,
        product.size,
        product.type,
        product.quantity,
      ),
      {
        parse_mode: 'HTML',
      },
    );

    await ctx.api.sendMessage(
      '582444807',
      orderAlert(
        name.message?.text,
        phone.message?.text,
        product.name,
        product.size,
        product.type,
        product.quantity,
        product.id,
      ),
      {
        parse_mode: 'HTML',
      },
    );

    return;
  }
}

injected(OrderProductsConversation, TOKENS.loggerService, TOKENS.productService);
