import { Container } from 'brandi';
import { TOKENS } from './tokens';
import { LoggerService } from '../common/logger/logger.service';
import { ConfigService } from '../common/config/config.service';

import { StartCommand } from '../commands/start/start.command';

import { Application } from '../app';
import { Bot } from '../tg-bot/bot';
import { Session } from '../session/session.service';

export const container = new Container();

container.bind(TOKENS.app).toInstance(Application).inSingletonScope();
container.bind(TOKENS.bot).toInstance(Bot).inSingletonScope();
container.bind(TOKENS.loggerService).toInstance(LoggerService).inSingletonScope();
container.bind(TOKENS.configService).toInstance(ConfigService).inSingletonScope();
container.bind(TOKENS.startCommand).toInstance(StartCommand).inSingletonScope();
container.bind(TOKENS.session).toInstance(Session).inSingletonScope();
