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
exports.SetProductsImageConversation = void 0;
const conversation_1 = require("../conversation");
const text_1 = require("../global/text");
const keyboard_1 = require("../global/keyboard");
const text_2 = require("./helpers/text");
class SetProductsImageConversation extends conversation_1.BaseConversation {
    constructor(_loggerService, _productService) {
        super(_loggerService);
        this._loggerService = _loggerService;
        this._productService = _productService;
    }
    getName() {
        return 'setProductImage';
    }
    handle(conversation, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply(text_1.putID);
            const productID = yield conversation.waitFor('message');
            if (!productID.message.text ||
                isNaN(Number(productID.message.text)) ||
                productID.message.text === 'exit') {
                yield ctx.reply('Не введено id або exit');
                return;
            }
            yield ctx.reply(text_2.selectCountPhoto, {
                reply_markup: {
                    keyboard: keyboard_1.photoCountToUploadKeyboard,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            const count = yield conversation.waitFor('message');
            if (!count.message.text ||
                isNaN(Number(count.message.text)) ||
                count.message.text === 'exit' ||
                Number(count.message.text) > 5) {
                yield ctx.reply('Не число або exit. А також максимум 5 фото');
                return;
            }
            yield ctx.reply(`Кидай ${count.message.text} фото`);
            let i = 0;
            while (Number(count.message.text) >= i) {
                const { message } = yield conversation.waitFor(':photo');
                if (!(message === null || message === void 0 ? void 0 : message.photo) || message.text === 'exit') {
                    yield ctx.reply('Проблема або exit');
                    return;
                }
                const images = yield conversation.external(() => {
                    return this._productService.createImage(message.photo[message.photo.length - 1].file_id, Number(productID.message.text));
                });
                if (!images) {
                    yield ctx.reply('Помилка при додаванні фото');
                    return;
                }
                yield ctx.reply(`Фото ${images.id} додано до продукту ${productID.message.text}`);
                i++;
            }
            return;
        });
    }
}
exports.SetProductsImageConversation = SetProductsImageConversation;
