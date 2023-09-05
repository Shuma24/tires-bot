"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(bot, _logger) {
        this.bot = bot;
        this._logger = _logger;
        this._logger.info(`${this.constructor.name} initialized`);
    }
}
exports.Command = Command;
