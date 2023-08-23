import { injected } from 'brandi';
import { TOKENS } from './containter/tokens';
import { ILoggerService } from './common/interfaces/logger.service.interface';
import { Command } from './commands/command';

import { IBot } from './tg-bot/interface/bot.interface';
import { IORMService } from './dataBase/orm.interface';

export class Application {
  commands: Command[] = [];

  constructor(
    private readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _startCommand: Command,
    private readonly _ormService: IORMService,
    private readonly _addProductCommand: Command,
    private readonly _imageCommand: Command,
    private readonly _deleteCommand: Command,
  ) {
    this.commands = [_startCommand, _addProductCommand, _imageCommand, _deleteCommand];
  }

  initCommands() {
    for (const command of this.commands) {
      command.handle();
    }
  }

  connectToDataBase() {
    this._ormService.connect();
  }

  init() {
    try {
      this.connectToDataBase();

      this.initCommands();

      this._bot.instance.start();

      this._loggerService.info('Bot started and ready to work');
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
      }
    }
  }
}

injected(
  Application,
  TOKENS.bot,
  TOKENS.loggerService,
  TOKENS.startCommand,
  TOKENS.ormService,
  TOKENS.addProductCommand,
  TOKENS.imageCommand,
  TOKENS.DeleteProductCommand,
);
