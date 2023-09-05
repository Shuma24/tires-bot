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
exports.OrderProductsConversation = void 0;
const conversation_1 = require("../conversation");
const text_reply_1 = require("./helpers/text-reply");
const keyboard_1 = require("./helpers/keyboard");
class OrderProductsConversation extends conversation_1.BaseConversation {
    constructor(_loggerService, _productService, _adminService) {
        super(_loggerService);
        this._loggerService = _loggerService;
        this._productService = _productService;
        this._adminService = _adminService;
    }
    getName() {
        return 'orderProducts';
    }
    handle(conversation, ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply(text_reply_1.startOrder, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboard_1.cancelOrder,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                    remove_keyboard: true,
                },
            });
            const name = yield conversation.waitFor(':text');
            if (!((_a = name.message) === null || _a === void 0 ? void 0 : _a.text)) {
                yield ctx.reply('Сталась помилка спробуйте ще раз');
                return;
            }
            if (((_b = name.message) === null || _b === void 0 ? void 0 : _b.text) === 'Скасувати замовлення') {
                yield ctx.reply('Скасовано жми /start');
                return;
            }
            yield ctx.reply(text_reply_1.userPhone, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboard_1.cancelOrder,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                    remove_keyboard: true,
                },
            });
            const phone = yield conversation.waitFor(':text');
            if (!((_c = phone.message) === null || _c === void 0 ? void 0 : _c.text) || isNaN(Number(phone.message.text))) {
                yield ctx.reply('Сталась помилка або введено не номер мобільного телефону');
                return;
            }
            if (((_d = phone.message) === null || _d === void 0 ? void 0 : _d.text) === 'Скасувати замовлення') {
                yield ctx.reply('Скасовано жми /start');
                return;
            }
            const product = yield conversation.external(() => {
                return this._productService.getById(Number(conversation.session.productOrOrder));
            });
            if (!product) {
                yield ctx.reply('Обрано не існуючий продукт, спробуйте ще раз');
                return;
            }
            yield ctx.reply((0, text_reply_1.createOrderResponse)((_e = name.message) === null || _e === void 0 ? void 0 : _e.text, (_f = phone.message) === null || _f === void 0 ? void 0 : _f.text, product.name, product.size, product.type, product.quantity), {
                parse_mode: 'HTML',
            });
            const admins = yield conversation.external(() => {
                return this._adminService.getAll();
            });
            if (!admins)
                return;
            for (let i = 0; i < admins.length; i++) {
                yield ctx.api.sendMessage(admins[i].TelegramID, (0, text_reply_1.orderAlert)((_g = name.message) === null || _g === void 0 ? void 0 : _g.text, (_h = phone.message) === null || _h === void 0 ? void 0 : _h.text, product.name, product.size, product.type, product.quantity, product.id, name.message.from.id), {
                    parse_mode: 'HTML',
                });
            }
            return;
        });
    }
}
exports.OrderProductsConversation = OrderProductsConversation;
