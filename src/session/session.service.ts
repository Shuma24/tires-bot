import LocalSession, { LocalSessionOptions } from 'telegraf-session-local';
import { IBotContext } from '../tg-bot/interface/bot-context.interface';
import { ISession } from './interface/session.service';

export class Session implements ISession {
  use: LocalSession<LocalSessionOptions<IBotContext>>;

  constructor() {
    this.use = new LocalSession({
      database: '../session_db.json',
      storage: LocalSession.storageFileAsync,
    });
  }
}
