"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor(_loggerService) {
        this._loggerService = _loggerService;
        const { error, parsed } = (0, dotenv_1.config)({ path: `.env` });
        if (error)
            throw new Error('.env is required.');
        if (!parsed)
            throw new Error('.env is empty');
        this.config = parsed;
        this._loggerService.info('ConfigService is initialized and working.');
    }
    get(key) {
        const result = this.config[key];
        if (!result)
            throw new Error('ENV Key is required.');
        return result;
    }
}
exports.ConfigService = ConfigService;
