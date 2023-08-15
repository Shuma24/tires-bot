import { token } from 'brandi';
import { ILoggerService } from '../common/interfaces/logger.service.interface';
import { IConfigService } from '../common/interfaces/config.service.interface';
import { Application } from '../app';
import { Command } from '../commands/command';
import { IBot } from '../tg-bot/interface/bot.interface';
import { ISession } from '../session/interface/session.service';

export const TOKENS = {
  app: token<Application>('app'),
  bot: token<IBot>('bot'),
  loggerService: token<ILoggerService>('loggerService'),
  configService: token<IConfigService>('configService'),
  startCommand: token<Command>('startCommand'),
  session: token<ISession>('session'),
};
