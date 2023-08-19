import { Bot } from 'grammy';
import { IBotContext } from '../tg-bot/interface/bot-context.interface';
import { ILoggerService } from '../common/interfaces/logger.service.interface';

export abstract class Command {
  constructor(protected readonly bot: Bot<IBotContext>, private readonly _logger: ILoggerService) {
    this._logger.info(`${this.constructor.name} initialized`);
  }

  abstract handle(): void;
}
