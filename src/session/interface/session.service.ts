import LocalSession, { LocalSessionOptions } from 'telegraf-session-local';
import { IBotContext } from '../../tg-bot/interface/bot-context.interface';

export interface ISession {
  use: LocalSession<LocalSessionOptions<IBotContext>>;
}
