import { BaseConversation } from '../conversation';

import { unbanID } from './helpers/text';
import { ILoggerService } from '../../core/common/interfaces/logger.service.interface';
import { IBotContext, IBotConversation } from '../../bot/interface/bot-context.interface';
import { IBlackListService } from '../../black-list/interfaces/black-list.service.interface';

export class UnBanConversation extends BaseConversation {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _blackListService: IBlackListService,
  ) {
    super(_loggerService);
  }

  public getName(): string {
    return 'unBanUsers';
  }

  async handle(conversation: IBotConversation, ctx: IBotContext): Promise<void> {
    await ctx.reply(unbanID);

    const id = await conversation.waitFor(':text');

    if (!id.message?.text || isNaN(Number(id.message.text)) || id.message?.text === 'exit') {
      await ctx.reply('Введено не число або exit');

      return;
    }

    const isUnban = conversation.external(async () => {
      return await this._blackListService.removeFromBlackList(Number(id.message.text));
    });

    if (!isUnban) return;

    await ctx.reply('true');

    return;
  }
}
