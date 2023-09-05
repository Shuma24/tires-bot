"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnBanConversation = void 0;
const conversation_1 = require("../conversation");
const text_1 = require("./helpers/text");
class UnBanConversation extends conversation_1.BaseConversation {
    constructor(_loggerService, _blackListService) {
        super(_loggerService);
        this._loggerService = _loggerService;
        this._blackListService = _blackListService;
    }
    getName() {
        return 'unBanUsers';
    }
    handle(conversation, ctx) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply(text_1.unbanID);
            const id = yield conversation.waitFor(':text');
            if (!((_a = id.message) === null || _a === void 0 ? void 0 : _a.text) || isNaN(Number(id.message.text)) || ((_b = id.message) === null || _b === void 0 ? void 0 : _b.text) === 'exit') {
                yield ctx.reply('Введено не число або exit');
                return;
            }
            const isUnban = conversation.external(() => __awaiter(this, void 0, void 0, function* () {
                return yield this._blackListService.removeFromBlackList(Number(id.message.text));
            }));
            if (!isUnban)
                return;
            yield ctx.reply('true');
            return;
        });
    }
}
exports.UnBanConversation = UnBanConversation;
