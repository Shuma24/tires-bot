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
exports.DeleteProduct = void 0;
const command_1 = require("../command");
class DeleteProduct extends command_1.Command {
    constructor(_bot, _loggerService, _adminService) {
        super(_bot.instance, _loggerService);
        this._bot = _bot;
        this._loggerService = _loggerService;
        this._adminService = _adminService;
    }
    handle() {
        this.bot.command('del', (ctx) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const listOfAdmins = yield this._adminService.getAll();
            if (!((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.from)) {
                return yield ctx.reply('Вийшла помилка спробуйте ще раз');
            }
            if (!listOfAdmins) {
                return yield ctx.reply('Не встановлено адмінів або проблема з ДБ');
            }
            const isAdmin = listOfAdmins.find((el) => el.TelegramID === Number(ctx.message.from.id.toString()));
            if (!isAdmin)
                return yield ctx.reply('No access');
            yield ctx.conversation.enter('delProduct');
            return;
        }));
    }
}
exports.DeleteProduct = DeleteProduct;
