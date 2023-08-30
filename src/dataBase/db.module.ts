import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { ORMService } from './orm.service';

export const dataBaseModule = new DependencyModule();

dataBaseModule.bind(TOKENS.ormService).toInstance(ORMService).inSingletonScope();

injected(ORMService, TOKENS.loggerService);
