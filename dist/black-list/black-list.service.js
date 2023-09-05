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
exports.BlackListService = void 0;
class BlackListService {
    constructor(_loggerService, _blackListRepository) {
        this._loggerService = _loggerService;
        this._blackListRepository = _blackListRepository;
        this._loggerService.info('Black list service initialized');
    }
    addToBlackList(telegramID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bannedUser = yield this._blackListRepository.create(telegramID);
                return bannedUser;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    removeFromBlackList(dataBaseID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removed = yield this._blackListRepository.delete(dataBaseID);
                return removed;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listOfBannedUsers = yield this._blackListRepository.getAll();
                return listOfBannedUsers;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.BlackListService = BlackListService;
