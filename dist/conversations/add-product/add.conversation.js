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
exports.AddProductConversation = void 0;
const width_button_generator_1 = require("../../helpers/width-button.generator");
const conversation_1 = require("../conversation");
const product_reply_generator_1 = require("./helpers/product-reply-generator");
const text_1 = require("./helpers/text");
const keyboard_1 = require("../global/keyboard");
const keyboard_2 = require("./helpers/keyboard");
class AddProductConversation extends conversation_1.BaseConversation {
    constructor(_productService, _loggerService) {
        super(_loggerService);
        this._productService = _productService;
        this._loggerService = _loggerService;
    }
    getName() {
        return 'addProduct';
    }
    handle(conversation, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply(text_1.productName);
            const name = yield conversation.waitFor('message');
            if (!name.message.text || name.message.text === 'exit') {
                yield ctx.reply('Виходмо не коректні дані або exit.');
                return;
            }
            yield ctx.reply(text_1.productDescription);
            const description = yield conversation.waitFor('message');
            if (!description.message.text || description.message.text === 'exit') {
                yield ctx.reply('Виходмо не коректні дані або exit.');
                return;
            }
            yield ctx.reply(text_1.productPrice);
            const price = yield conversation.waitFor('message');
            if (!price.message.text || isNaN(Number(price.message.text)) || price.message.text === 'exit') {
                yield ctx.reply('Виходмо не коректні дані або exit.');
                return;
            }
            yield ctx.reply(text_1.productType, {
                reply_markup: {
                    keyboard: keyboard_1.typeKeyBoard,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            const type = yield conversation.waitFor('message');
            if (!type.message.text || type.message.text === 'exit') {
                yield ctx.reply('Помилка або exit');
                return;
            }
            yield ctx.reply(text_1.productRadius, {
                reply_markup: {
                    keyboard: keyboard_1.radiusKeyBoard,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            const radius = yield conversation.waitFor('message');
            if (!radius.message.text ||
                isNaN(Number(radius.message.text)) ||
                radius.message.text === 'exit') {
                yield ctx.reply('Виходмо не коректні дані або exit.');
                return;
            }
            yield ctx.reply(text_1.productWidth, {
                reply_markup: {
                    keyboard: (0, width_button_generator_1.generateWidthTires)(Number(radius.message.text)),
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            const width = yield conversation.waitFor('message');
            if (!width.message.text || isNaN(Number(width.message.text)) || width.message.text === 'exit') {
                yield ctx.reply('Виходмо не коректні дані або exit.');
                return;
            }
            yield ctx.reply(text_1.productHeight, {
                reply_markup: {
                    keyboard: keyboard_1.heightKeyBoard,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            const height = yield conversation.waitFor('message');
            if (!height.message.text ||
                isNaN(Number(height.message.text)) ||
                height.message.text === 'exit') {
                yield ctx.reply('Виходмо не коректні дані або exit');
                return;
            }
            yield ctx.reply(text_1.productQuantity, {
                reply_markup: {
                    keyboard: keyboard_1.quantityKeyBoard,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            const quantity = yield conversation.waitFor('message');
            if (!quantity.message.text ||
                isNaN(Number(quantity.message.text)) ||
                quantity.message.text === 'exit') {
                yield ctx.reply('Виходмо не коректні дані або exit');
                return;
            }
            yield ctx.reply(text_1.waitForCreate, {
                parse_mode: 'HTML',
            });
            const product = yield conversation.external(() => {
                return this._productService.create({
                    name: name.message.text,
                    description: description.message.text,
                    price: Number(price.message.text),
                    type: type.message.text,
                    radius: Number(radius.message.text),
                    width: Number(width.message.text),
                    height: Number(height.message.text),
                    quantity: Number(quantity.message.text),
                });
            });
            if (!product) {
                yield ctx.reply('Помилка при додаванні продукту');
                return;
            }
            yield ctx.reply((0, product_reply_generator_1.productReplyGenerator)(product), { parse_mode: 'HTML' });
            yield ctx.reply(text_1.isPhotoProduct, {
                reply_markup: {
                    keyboard: keyboard_2.isAddPhotoKeyboard,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            const isHavePhoto = yield conversation.waitFor('message');
            if (!isHavePhoto.message.text ||
                isHavePhoto.message.text === 'No' ||
                isHavePhoto.message.text !== 'Yes') {
                yield ctx.reply('Ок можна добавити потім');
                return;
            }
            yield ctx.reply(text_1.imageCount, {
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
            yield ctx.reply(`Відправ ${count.message.text} фото`);
            let i = 0;
            while (Number(count.message.text) >= i) {
                const { message } = yield conversation.waitFor(':photo');
                if (!(message === null || message === void 0 ? void 0 : message.photo) || message.text === 'exit') {
                    yield ctx.reply('Проблема або exit');
                    return;
                }
                const images = yield conversation.external(() => {
                    return this._productService.createImage(message.photo[message.photo.length - 1].file_id, product.id);
                });
                if (!images) {
                    yield ctx.reply('Помилка при додаванні фото');
                    return;
                }
                yield ctx.reply(`Фото ${images.id} додано до продукту ${product.id}`);
                i++;
            }
            return;
        });
    }
}
exports.AddProductConversation = AddProductConversation;
