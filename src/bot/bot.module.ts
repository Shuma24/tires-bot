import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { myBot } from './bot';

export const botModule = new DependencyModule();

botModule.bind(TOKENS.bot).toInstance(myBot).inSingletonScope();

injected(myBot, TOKENS.configService, TOKENS.conversationFactory);
