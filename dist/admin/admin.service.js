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
exports.AdminService = void 0;
class AdminService {
    constructor(_loggerService, _adminRepository) {
        this._loggerService = _loggerService;
        this._adminRepository = _adminRepository;
        this._loggerService.info('Admin service is initialized');
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listOfAdmins = yield this._adminRepository.getAll();
                return listOfAdmins;
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
exports.AdminService = AdminService;
