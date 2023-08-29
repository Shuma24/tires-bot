import { injected } from 'brandi';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { IBotContext, IBotConversation } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';

import { TOKENS } from '../../containter/tokens';
import { unbanID } from './helpers/text';

export class UnBanConversation extends BaseConversation {
  constructor(private readonly _loggerService: ILoggerService) {
    super(_loggerService);
  }

  public getName(): string {
    return 'unBanUsers';
  }

  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(unbanID);

    const userTelegramID = await conversation.waitFor(':text');

    if (
      !userTelegramID.message?.text ||
      isNaN(Number(userTelegramID.message.text)) ||
      userTelegramID.message?.text === 'exit'
    ) {
      await ctx.reply('Введено не число або exit');

      return;
    }

    const isUnban = await ctx.unbanChatSenderChat(Number(userTelegramID.message.text));

    if (!isUnban) return;

    await ctx.reply('true');

    return;
  }
}

injected(UnBanConversation, TOKENS.loggerService);
