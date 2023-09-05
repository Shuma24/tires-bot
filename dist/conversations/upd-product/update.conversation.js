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
exports.UpdateProductConversation = void 0;
const width_button_generator_1 = require("../../helpers/width-button.generator");
const conversation_1 = require("../conversation");
const func_1 = require("./helpers/func");
const keyboard_1 = require("./helpers/keyboard");
const text_1 = require("./helpers/text");
const keyboard_2 = require("../global/keyboard");
class UpdateProductConversation extends conversation_1.BaseConversation {
    constructor(_loggerService, _productService) {
        super(_loggerService);
        this._loggerService = _loggerService;
        this._productService = _productService;
    }
    getName() {
        return 'updateProduct';
    }
    handle(conversation, ctx) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply(text_1.awaitUserID);
            const productID = yield conversation.waitFor(':text');
            if (!((_a = productID.message) === null || _a === void 0 ? void 0 : _a.text) ||
                isNaN(Number(productID.message.text)) ||
                ((_b = productID.message) === null || _b === void 0 ? void 0 : _b.text) === 'exit') {
                yield ctx.reply('Введено не число або exit');
                return;
            }
            yield ctx.reply(text_1.fieldToUpdate, {
                reply_markup: {
                    keyboard: keyboard_1.selectFieldToUpdateKeyboard,
                    one_time_keyboard: true,
                    remove_keyboard: true,
                    resize_keyboard: true,
                },
            });
            const selectedFieldToUpdate = yield conversation.waitFor('message');
            if (!((_c = selectedFieldToUpdate.message) === null || _c === void 0 ? void 0 : _c.text) || selectedFieldToUpdate.message.text === 'exit') {
                yield ctx.reply('Помилка або exit');
                return;
            }
            const data = {};
            switch (selectedFieldToUpdate.message.text) {
                case 'name':
                    yield ctx.reply(text_1.setNewName);
                    const name = yield conversation.waitFor('message');
                    if (!name.message.text || name.message.text === 'exit') {
                        yield ctx.reply('Виходмо не коректні дані або exit.');
                        return;
                    }
                    data['name'] = name.message.text;
                    break;
                case 'description':
                    yield ctx.reply(text_1.setNewDescription);
                    const description = yield conversation.waitFor('message');
                    if (!description.message.text || description.message.text === 'exit') {
                        yield ctx.reply('Виходмо не коректні дані або exit.');
                        return;
                    }
                    data['description'] = description.message.text;
                    break;
                case 'price':
                    yield ctx.reply(text_1.setNewPrice);
                    const price = yield conversation.waitFor('message');
                    if (!price.message.text ||
                        isNaN(Number(price.message.text)) ||
                        price.message.text === 'exit') {
                        yield ctx.reply('Виходмо не коректні дані або exit.');
                        return;
                    }
                    data['price'] = Number(price.message.text);
                    break;
                case 'size':
                    yield ctx.reply(text_1.setNewRadius, {
                        reply_markup: {
                            keyboard: keyboard_2.radiusKeyBoard,
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
                    yield ctx.reply(text_1.setNewWidth, {
                        reply_markup: {
                            keyboard: (0, width_button_generator_1.generateWidthTires)(Number(radius.message.text), true),
                            resize_keyboard: true,
                            one_time_keyboard: true,
                        },
                    });
                    const width = yield conversation.waitFor('message');
                    if (!width.message.text ||
                        isNaN(Number(width.message.text)) ||
                        width.message.text === 'exit') {
                        yield ctx.reply('Виходмо не коректні дані або exit.');
                        return;
                    }
                    yield ctx.reply(text_1.setNewHeight, {
                        reply_markup: {
                            keyboard: keyboard_2.heightKeyBoard,
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
                    data['size'] = `${width.message.text}/${height.message.text}/${radius.message.text}`;
                    break;
                case 'quantity':
                    yield ctx.reply(text_1.setNewQuantity, {
                        reply_markup: {
                            keyboard: keyboard_2.quantityKeyBoard,
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
                    data['quantity'] = Number(quantity.message.text);
                    break;
                case 'type':
                    yield ctx.reply(text_1.setNewType, {
                        reply_markup: {
                            keyboard: keyboard_2.typeKeyBoard,
                            resize_keyboard: true,
                            one_time_keyboard: true,
                        },
                    });
                    const type = yield conversation.waitFor('message');
                    if (!type.message.text || type.message.text === 'exit') {
                        yield ctx.reply('Помилка або exit');
                        return;
                    }
                    data['type'] = type.message.text;
                    break;
                default:
                    yield ctx.reply('Сталась помилка або exit, не коректне поле для апдейту');
                    return;
            }
            const product = yield conversation.external(() => {
                return this._productService.update(data, Number(productID.message.text));
            });
            if (!product) {
                yield ctx.reply('Пробелма з апдейтом');
                return;
            }
            yield ctx.reply((0, func_1.updateProductReplyGenerator)(product), {
                parse_mode: 'HTML',
            });
            return;
        });
    }
}
exports.UpdateProductConversation = UpdateProductConversation;
