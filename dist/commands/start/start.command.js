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
exports.StartCommand = void 0;
const command_1 = require("../command");
const buttons_1 = require("../../helpers/buttons");
const width_button_generator_1 = require("../../helpers/width-button.generator");
const regexs_1 = require("../helpers/regexs");
const type_selector_1 = require("../helpers/type-selector");
const back_home_handle_1 = require("../helpers/back-home.handle");
const start_command_text_1 = require("../helpers/start-command-text");
class StartCommand extends command_1.Command {
    constructor(_bot, _loggerService, _productService, _blackListService) {
        super(_bot.instance, _loggerService);
        this._bot = _bot;
        this._loggerService = _loggerService;
        this._productService = _productService;
        this._blackListService = _blackListService;
    }
    handle() {
        //sub-command navigation
        this.startCommand();
        this.listenContacts();
        this.xPartGenerate();
        this.seasonMenu();
        this.radiusMenuAndSetSeason();
        this.widthGenerateAndSetRadius();
        this.heightGenerateAndSetWidth();
        this.setHeightAndTriggerDB();
        this.productPaginationCallback();
        this.photoPaginationCallback();
        this.OrderCallback();
    }
    startCommand() {
        this.bot.command('start', (ctx) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const listOfBannedUsers = yield this._blackListService.getAll();
            if (!((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.from)) {
                return yield ctx.reply('Вийшла помилка спробуйте ще раз');
            }
            if (!listOfBannedUsers) {
                return yield ctx.reply('Problem for load black list');
            }
            const isBanned = listOfBannedUsers.find((el) => el.TelegramID === Number(ctx.message.from.id.toString()));
            if (isBanned)
                return yield ctx.reply('You banned');
            //start generate
            yield ctx.reply('Привіт ✌🏻');
            yield ctx.reply('Я допоможу тобі із підбором шин до твого 🚗');
            yield ctx.reply(`<b>Виберіть опцію:</b>`, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: buttons_1.startButtons,
                    resize_keyboard: true,
                },
            });
        }));
    }
    listenContacts() {
        this.bot.hears('📞 Контакти', (ctx) => {
            ctx.reply(start_command_text_1.contactsFromMainMenu, {
                parse_mode: 'HTML',
            });
        });
    }
    xPartGenerate() {
        this.bot.hears('Корисний лінк для авто', (ctx) => {
            ctx.reply('https://xpart.in.ua/');
        });
    }
    seasonMenu() {
        this.bot.hears('🔍 Підібрати шини', (ctx) => __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply(start_command_text_1.askAboutSeasonType, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: buttons_1.seasonButtons,
                    one_time_keyboard: true,
                    resize_keyboard: true,
                },
            });
        }));
    }
    radiusMenuAndSetSeason() {
        this.bot.hears(regexs_1.typesRegex, (ctx) => __awaiter(this, void 0, void 0, function* () {
            if (!ctx.msg.text)
                return yield ctx.reply('Вийшла помилка спробуйте ще раз');
            const response = (0, back_home_handle_1.handleBackHomeButtons)(ctx.msg.text);
            if (response) {
                return yield ctx.reply(response.text, {
                    reply_markup: {
                        keyboard: response.buttons,
                        resize_keyboard: true,
                    },
                });
            }
            const checkedType = (0, type_selector_1.checkType)(ctx.msg.text);
            checkedType && (ctx.session.type = checkedType);
            yield ctx.reply(start_command_text_1.askAboutRadius, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: buttons_1.radiusButtons,
                    one_time_keyboard: true,
                    resize_keyboard: true,
                },
            });
        }));
    }
    widthGenerateAndSetRadius() {
        this.bot.hears(regexs_1.radiusRegex, (ctx) => __awaiter(this, void 0, void 0, function* () {
            if (!ctx.msg.text)
                return yield ctx.reply('Вийшла помилка спробуйте ще раз');
            const response = (0, back_home_handle_1.handleBackHomeButtons)(ctx.msg.text);
            if (response) {
                return yield ctx.reply(response.text, {
                    reply_markup: {
                        keyboard: response.buttons,
                        resize_keyboard: true,
                    },
                });
            }
            const radius = Number(ctx.msg.text.replace(/R/, ''));
            ctx.session.radius = radius;
            const widthButtons = (0, width_button_generator_1.generateWidthTires)(radius);
            ctx.reply(start_command_text_1.askAboutWidth, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: widthButtons,
                    one_time_keyboard: true,
                    resize_keyboard: true,
                },
            });
        }));
    }
    heightGenerateAndSetWidth() {
        this.bot.hears(regexs_1.widthRegex, (ctx) => __awaiter(this, void 0, void 0, function* () {
            if (!ctx.msg.text) {
                return yield ctx.reply('Вийшла помилка спробуйте ще раз');
            }
            ctx.session.width = Number(ctx.msg.text);
            const response = (0, back_home_handle_1.handleBackHomeButtons)(ctx.msg.text);
            if (response) {
                return yield ctx.reply(response.text, {
                    reply_markup: {
                        keyboard: response.buttons,
                        resize_keyboard: true,
                    },
                });
            }
            ctx.reply(start_command_text_1.askAboutHeight, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: buttons_1.heightButtons,
                    one_time_keyboard: true,
                    resize_keyboard: true,
                },
            });
        }));
    }
    setHeightAndTriggerDB() {
        this.bot.hears(regexs_1.heightRegex, (ctx) => __awaiter(this, void 0, void 0, function* () {
            if (!ctx.msg.text) {
                return yield ctx.reply('Вийшла помилка спробуйте ще раз');
            }
            ctx.session.height = Number(ctx.msg.text);
            const radius = ctx.session.radius || 21;
            const heightResponse = (0, back_home_handle_1.handleBackHomeButtons)(ctx.msg.text, radius);
            if (heightResponse) {
                return yield ctx.reply(heightResponse.text, {
                    reply_markup: {
                        keyboard: heightResponse.buttons,
                        resize_keyboard: true,
                    },
                });
            }
            yield ctx.reply(start_command_text_1.workOnYouReq, {
                parse_mode: 'HTML',
                reply_markup: {
                    remove_keyboard: true,
                },
            });
            this.handleProducts(ctx);
        }));
    }
    productPaginationCallback() {
        this.bot.callbackQuery(/page_(\d+)/, (ctx) => __awaiter(this, void 0, void 0, function* () {
            ctx.session.pages = parseInt(ctx.match[1], 10);
            yield this.handleProducts(ctx);
        }));
    }
    photoPaginationCallback() {
        this.bot.callbackQuery(/img_(\d+)_(\d+)/, (ctx) => __awaiter(this, void 0, void 0, function* () {
            const productId = parseInt(ctx.match[1], 10);
            const photoIndex = parseInt(ctx.match[2], 10);
            const product = yield this._productService.getById(productId);
            if (!product || !product.images)
                return yield ctx.reply('Сталась проблема спробуйте ще раз.');
            const totalPhotos = product.images.length;
            let nextIndex = (photoIndex + 1) % totalPhotos;
            let prevIndex = (photoIndex - 1 + totalPhotos) % totalPhotos;
            const caption = (0, start_command_text_1.productDescriptionGenerate)(product.name, product.size, product.description, product.quantity, product.price);
            const photoUrl = product.images[photoIndex].url ||
                'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
            yield ctx.editMessageMedia({
                type: 'photo',
                media: photoUrl,
                caption: caption,
                parse_mode: 'HTML',
            }, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '⬅️ Попереднє', callback_data: `img_${product.id}_${prevIndex}}` },
                            { text: 'Наступне ➡️', callback_data: `img_${product.id}_${nextIndex}` },
                        ],
                        [{ text: `Замовити ${product.name}`, callback_data: `order_${productId}` }],
                    ],
                },
            });
        }));
    }
    OrderCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.callbackQuery(/order_(\d+)/, (ctx) => __awaiter(this, void 0, void 0, function* () {
                const productToOrder = parseInt(ctx.match[1], 10);
                ctx.session.productOrOrder = productToOrder;
                yield ctx.conversation.enter('orderProducts');
            }));
        });
    }
    handleProducts(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.session.radius || !ctx.session.type || !ctx.session.width || !ctx.session.height) {
                return yield ctx.reply('Ви пропустили щось обрати..');
            }
            const size = `${ctx.session.width}/${ctx.session.height}/${ctx.session.radius}`;
            const products = yield this._productService.getForCustomer(size, ctx.session.type, ctx.session.pages);
            if (!products || !products.data.length) {
                return yield ctx.reply(start_command_text_1.noTiresLength, {
                    parse_mode: 'HTML',
                });
            }
            for (let product of products.data) {
                const captionText = (0, start_command_text_1.productDescriptionGenerate)(product.name, product.size, product.description, product.quantity, product.price);
                let mainButton = {
                    text: `Замовити ${product.name}`,
                    callback_data: `order_${product.id}`,
                };
                let imageButtons = [];
                if (product.images && product.images.length > 0) {
                    let currentImageIndex = 0;
                    let nextImageIndex = (currentImageIndex + 1) % product.images.length;
                    if (product.images.length > 1) {
                        imageButtons.push({
                            text: `Наступне фото 👉🏻`,
                            callback_data: `img_${product.id}_${nextImageIndex}`,
                        });
                    }
                    yield ctx.replyWithPhoto(product.images[0].url ||
                        'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg', {
                        caption: captionText,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [imageButtons, [mainButton]],
                        },
                    });
                }
                else {
                    yield ctx.reply(captionText, {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [[mainButton]],
                        },
                    });
                }
            }
            const buttonRow = [];
            if (ctx.session.pages < products.lastPage) {
                buttonRow.push([{ text: 'Вперед', callback_data: `page_${ctx.session.pages + 1}` }]);
            }
            if (products.total <= 3 || ctx.session.pages === products.lastPage) {
                ctx.session.pages = 0;
                return yield ctx.reply(start_command_text_1.onlyOnePageTires, {
                    parse_mode: 'HTML',
                });
            }
            yield ctx.reply(start_command_text_1.pagesText, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: buttonRow,
                },
            });
        });
    }
}
exports.StartCommand = StartCommand;
