"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
class Application {
    constructor(_bot, _loggerService, _ormService, _commandFactory) {
        this._bot = _bot;
        this._loggerService = _loggerService;
        this._ormService = _ormService;
        this._commandFactory = _commandFactory;
        this.commands = [];
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
        }
        catch (error) {
            if (error instanceof Error) {
                this._loggerService.error(error.message);
            }
        }
    }
}
exports.Application = Application;
