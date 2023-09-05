"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageModule = void 0;
const brandi_1 = require("brandi");
const tokens_1 = require("../containter/tokens");
const storage_service_1 = require("./storage.service");
exports.storageModule = new brandi_1.DependencyModule();
//binds
exports.storageModule.bind(tokens_1.TOKENS.storage).toInstance(storage_service_1.S3Storage).inSingletonScope();
//inject
(0, brandi_1.injected)(storage_service_1.S3Storage, tokens_1.TOKENS.configService, tokens_1.TOKENS.loggerService);
