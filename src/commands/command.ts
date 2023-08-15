import { Telegraf } from 'telegraf';
import { IBotContext } from '../tg-bot/interface/bot-context.interface';

export abstract class Command {


  constructor(protected readonly bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
