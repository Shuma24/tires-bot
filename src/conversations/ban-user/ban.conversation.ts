import { injected } from 'brandi';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { IBotContext, IBotConversation } from '../../tg-bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { userID } from './helpers/text';
import { TOKENS } from '../../containter/tokens';

export class BanConversation extends BaseConversation {
  constructor(private readonly _loggerService: ILoggerService) {
    super(_loggerService);
  }

  public getName(): string {
    return 'banUsers';
  }

  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(userID);

    const userTelegramID = await conversation.waitFor(':text');

    if (
      !userTelegramID.message?.text ||
      isNaN(Number(userTelegramID.message.text)) ||
      userTelegramID.message?.text === 'exit'
    ) {
      await ctx.reply('Введено не число або exit');

      return;
    }

    const isBan = await ctx.banChatSenderChat(Number(userTelegramID.message.text));

    if (!isBan) return;

    await ctx.reply('true');

    return;
  }
}

injected(BanConversation, TOKENS.loggerService);
