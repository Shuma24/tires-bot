import { IBot } from '../bot/interface/bot.interface';
import { Command } from '../commands/command';
import { ICommandFactory } from '../commands/interfaces/factory.interface';

import { IORMService } from '../dataBase/orm.interface';
import { ILoggerService } from './common/interfaces/logger.service.interface';

export class Application {
  commands: Command[] = [];

  constructor(
    private readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _ormService: IORMService,
    private readonly _commandFactory: ICommandFactory,
  ) {
    this.commands = this._commandFactory.createCommands();
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
