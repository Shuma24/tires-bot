import { injected } from 'brandi';
import { TOKENS } from './containter/tokens';
import { ILoggerService } from './common/interfaces/logger.service.interface';
import { Command } from './commands/command';

import { IBot } from './tg-bot/interface/bot.interface';

export class Application {
  commands: Command[] = [];

  constructor(
    private readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _startCommand: Command,
  ) {
    this.commands = [_startCommand];
  }

  initCommands() {
    for (const command of this.commands) {
      command.handle();
    }
  }

  init() {
    try {
      this.initCommands();

      this._bot.instance.launch();

      this._loggerService.info('Bot started and ready to work');
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
      }
    }
  }
}

injected(Application, TOKENS.bot, TOKENS.loggerService, TOKENS.startCommand);
