import { Telegraf } from 'telegraf';
import { IBotContext } from './bot-context.interface';

export interface IBot {
  instance: Telegraf<IBotContext>;
}
