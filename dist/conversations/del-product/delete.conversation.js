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
exports.DeleteProductConversation = void 0;
const conversation_1 = require("../conversation");
const text_1 = require("../global/text");
const text_2 = require("./helpers/text");
class DeleteProductConversation extends conversation_1.BaseConversation {
    constructor(_loggerService, _productService) {
        super(_loggerService);
        this._loggerService = _loggerService;
        this._productService = _productService;
    }
    getName() {
        return 'delProduct';
    }
    handle(conversation, ctx) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply(text_1.putID);
            const productID = yield conversation.waitFor(':text');
            if (!((_a = productID.message) === null || _a === void 0 ? void 0 : _a.text) ||
                isNaN(Number(productID.message.text)) ||
                ((_b = productID.message) === null || _b === void 0 ? void 0 : _b.text) === 'exit') {
                yield ctx.reply('Введено не число або exit');
                return;
            }
            const delResult = yield this._productService.delete(Number(productID.message.text));
            if (!delResult) {
                yield ctx.reply('Помилка видалення');
                return;
            }
            yield ctx.reply(text_2.deleted);
            return;
        });
    }
}
exports.DeleteProductConversation = DeleteProductConversation;
