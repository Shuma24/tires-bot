import { Bot } from 'grammy';
import { IBotContext } from '../tg-bot/interface/bot-context.interface';

export abstract class Command {
  constructor(protected readonly bot: Bot<IBotContext>) {}

  abstract handle(): void;
}
