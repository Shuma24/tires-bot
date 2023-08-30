import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { BlackListService } from './black-list.service';
import { BlackListRepository } from './black-list.repository';

export const blackListModule = new DependencyModule();

blackListModule.bind(TOKENS.blackListService).toInstance(BlackListService).inSingletonScope();
blackListModule.bind(TOKENS.blackListRepository).toInstance(BlackListRepository).inSingletonScope();

injected(BlackListService, TOKENS.loggerService, TOKENS.blackListRepository);
injected(BlackListRepository, TOKENS.ormService);
