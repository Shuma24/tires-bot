import { IBotContext, IBotConversation } from '../../bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { createOrderResponse, orderAlert, startOrder, userPhone } from './helpers/text-reply';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { cancelOrder } from './helpers/keyboard';
import { ILoggerService } from '../../core/common/interfaces/logger.service.interface';
import { IAdminService } from '../../admin/interfaces/admin-service.interface';

export class OrderProductsConversation extends BaseConversation {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
    private readonly _adminService: IAdminService,
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
        keyboard: cancelOrder,
        resize_keyboard: true,
        one_time_keyboard: true,
        remove_keyboard: true,
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
        keyboard: cancelOrder,
        resize_keyboard: true,
        one_time_keyboard: true,
        remove_keyboard: true,
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

    const admins = await conversation.external(() => {
      return this._adminService.getAll();
    });

    if (!admins) return;

    for (let i = 0; i < admins.length; i++) {
      await ctx.api.sendMessage(
        admins[i].TelegramID,
        orderAlert(
          name.message?.text,
          phone.message?.text,
          product.name,
          product.size,
          product.type,
          product.quantity,
          product.id,
          name.message.from.id,
        ),
        {
          parse_mode: 'HTML',
        },
      );
    }

    return;
  }
}
