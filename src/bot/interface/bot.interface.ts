import { Bot } from 'grammy';
import { IBotContext } from './bot-context.interface';

export interface IBot {
  instance: Bot<IBotContext>;
}
