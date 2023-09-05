"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModule = void 0;
const brandi_1 = require("brandi");
const product_service_1 = require("./product.service");
const tokens_1 = require("../containter/tokens");
const product_repository_1 = require("./product.repository");
exports.productModule = new brandi_1.DependencyModule();
//binds
exports.productModule.bind(tokens_1.TOKENS.productService).toInstance(product_service_1.ProductService).inSingletonScope();
exports.productModule.bind(tokens_1.TOKENS.productRepository).toInstance(product_repository_1.ProductRepository).inSingletonScope();
// injected
(0, brandi_1.injected)(product_service_1.ProductService, tokens_1.TOKENS.productRepository, tokens_1.TOKENS.configService, tokens_1.TOKENS.fetchService, tokens_1.TOKENS.storage, tokens_1.TOKENS.loggerService);
(0, brandi_1.injected)(product_repository_1.ProductRepository, tokens_1.TOKENS.ormService);
