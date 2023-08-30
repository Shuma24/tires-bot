import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { S3Storage } from './storage.service';

export const storageModule = new DependencyModule();

//binds
storageModule.bind(TOKENS.storage).toInstance(S3Storage).inSingletonScope();

//inject
injected(S3Storage, TOKENS.configService, TOKENS.loggerService);
