import { IBotContext, IBotConversation } from '../bot/interface/bot-context.interface';
import { ILoggerService } from '../core/common/interfaces/logger.service.interface';

export abstract class BaseConversation {
  constructor(_loggerService: ILoggerService) {
    _loggerService.info(`${this.getName()} conversation initialized`);
  }
  public abstract getName(): string;
  abstract handle(conversation: IBotConversation, ctx: IBotContext): Promise<void>;
}
