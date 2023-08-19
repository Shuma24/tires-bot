import { CallbackQueryContext } from 'grammy';
import { IBotContext } from '../../tg-bot/interface/bot-context.interface';

export function isCallbackQueryContext(ctx: any): ctx is CallbackQueryContext<IBotContext> {
  return 'callbackQuery' in ctx;
}
