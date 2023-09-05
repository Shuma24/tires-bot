"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreModule = void 0;
const brandi_1 = require("brandi");
const tokens_1 = require("../containter/tokens");
const logger_service_1 = require("./common/logger/logger.service");
const config_service_1 = require("./common/config/config.service");
const fetch_service_1 = require("./common/fetch/fetch.service");
const app_1 = require("./app");
exports.coreModule = new brandi_1.DependencyModule();
//bind
exports.coreModule.bind(tokens_1.TOKENS.loggerService).toInstance(logger_service_1.LoggerService).inSingletonScope();
exports.coreModule.bind(tokens_1.TOKENS.configService).toInstance(config_service_1.ConfigService).inSingletonScope();
exports.coreModule.bind(tokens_1.TOKENS.fetchService).toInstance(fetch_service_1.FetchService).inSingletonScope();
exports.coreModule.bind(tokens_1.TOKENS.app).toInstance(app_1.Application).inSingletonScope();
//inject
(0, brandi_1.injected)(app_1.Application, tokens_1.TOKENS.bot, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.ormService, tokens_1.TOKENS.commandFactory);
(0, brandi_1.injected)(config_service_1.ConfigService, tokens_1.TOKENS.loggerService);
(0, brandi_1.injected)(fetch_service_1.FetchService, tokens_1.TOKENS.loggerService);
