import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { LoggerService } from './common/logger/logger.service';
import { ConfigService } from './common/config/config.service';
import { FetchService } from './common/fetch/fetch.service';
import { Application } from './app';

export const coreModule = new DependencyModule();

//bind
coreModule.bind(TOKENS.loggerService).toInstance(LoggerService).inSingletonScope();
coreModule.bind(TOKENS.configService).toInstance(ConfigService).inSingletonScope();
coreModule.bind(TOKENS.fetchService).toInstance(FetchService).inSingletonScope();
coreModule.bind(TOKENS.app).toInstance(Application).inSingletonScope();

//inject
injected(Application, TOKENS.bot, TOKENS.loggerService, TOKENS.ormService, TOKENS.commandFactory);
injected(ConfigService, TOKENS.loggerService);
injected(FetchService, TOKENS.loggerService);
