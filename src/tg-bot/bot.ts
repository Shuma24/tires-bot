import { Telegraf } from 'telegraf';
import { IBotContext } from './interface/bot-context.interface';
import { IConfigService } from '../common/interfaces/config.service.interface';
import { IBot } from './interface/bot.interface';
import { injected } from 'brandi';
import { TOKENS } from '../containter/tokens';

import { ISession } from '../session/interface/session.service';

export class Bot implements IBot {
  instance: Telegraf<IBotContext>;

  constructor(
    private readonly _configService: IConfigService,
    private readonly _session: ISession,
  ) {
    this.instance = new Telegraf<IBotContext>(this._configService.get('BOT_SECRET'));
    this.instance.use(_session.use).middleware();
  }
}

injected(Bot, TOKENS.configService, TOKENS.session);
