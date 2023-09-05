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
exports.ORMService = void 0;
const client_1 = require("@prisma/client");
class ORMService {
    constructor(_loggerService) {
        this._loggerService = _loggerService;
        this.client = new client_1.PrismaClient();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.$connect();
                this._loggerService.info('Prisma connected to DB.');
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                }
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.$disconnect();
                this._loggerService.info('Prisma disconnected.');
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                }
            }
        });
    }
}
exports.ORMService = ORMService;
