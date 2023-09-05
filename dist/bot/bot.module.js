"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botModule = void 0;
const brandi_1 = require("brandi");
const tokens_1 = require("../containter/tokens");
const bot_1 = require("./bot");
exports.botModule = new brandi_1.DependencyModule();
exports.botModule.bind(tokens_1.TOKENS.bot).toInstance(bot_1.myBot).inSingletonScope();
(0, brandi_1.injected)(bot_1.myBot, tokens_1.TOKENS.configService, tokens_1.TOKENS.conversationFactory);
