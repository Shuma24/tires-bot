"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBaseModule = void 0;
const brandi_1 = require("brandi");
const tokens_1 = require("../containter/tokens");
const orm_service_1 = require("./orm.service");
exports.dataBaseModule = new brandi_1.DependencyModule();
exports.dataBaseModule.bind(tokens_1.TOKENS.ormService).toInstance(orm_service_1.ORMService).inSingletonScope();
(0, brandi_1.injected)(orm_service_1.ORMService, tokens_1.TOKENS.loggerService);
