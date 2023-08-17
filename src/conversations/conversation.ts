import { ILoggerService } from '../common/interfaces/logger.service.interface';

import { IBotContext, IBotConversation } from '../tg-bot/interface/bot-context.interface';

export abstract class BaseConversation {
  constructor(_loggerService: ILoggerService) {
    _loggerService.info(`${this.getName()} conversation initialized`);
  }
  public abstract getName(): string;
  abstract handle(conversation: IBotConversation, ctx: IBotContext): Promise<void>;
}
