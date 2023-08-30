import { IBotContext, IBotConversation } from '../../bot/interface/bot-context.interface';
import { BaseConversation } from '../conversation';
import { userID } from './helpers/text';
import { ILoggerService } from '../../core/common/interfaces/logger.service.interface';
import { IBlackListService } from '../../black-list/interfaces/black-list.service.interface';

export class BanConversation extends BaseConversation {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _blackListService: IBlackListService,
  ) {
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

    const isBan = conversation.external(async () => {
      return await this._blackListService.addToBlackList(Number(userTelegramID.message.text));
    });

    if (!isBan) return;

    await ctx.reply('true');

    return;
  }
}
