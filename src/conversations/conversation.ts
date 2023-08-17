import { ILoggerService } from '../common/interfaces/logger.service.interface';

import { IBotContext, IBotConversation } from '../tg-bot/interface/bot-context.interface';

export interface IBaseConversation {
  getName(): string;
  handle(conversation: IBotConversation, ctx: IBotContext): Promise<void>;
}

export abstract class BaseConversation {
  constructor(_loggerService: ILoggerService) {
    _loggerService.info(`${this.getName()} conversation initialized`);
  }
  public abstract getName(): string;
  abstract handle(conversation: IBotConversation, ctx: IBotContext): Promise<void>;
}
