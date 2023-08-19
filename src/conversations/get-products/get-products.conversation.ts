import { startButtons } from '../../helpers/buttons';
import { IBotConversation, IBotContext } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';

export class GetProducts extends BaseConversation {
  public getName(): string {
    return 'getProducts';
  }
  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply('Виберіть опцію:', {
      reply_markup: {
        keyboard: startButtons,
        resize_keyboard: true,
      },
    });

    conversation.form.select(['test']);

    const firstSelect = await conversation.waitFor('message');

    if (!firstSelect.message.text) {
      return;
    }
  }
}
