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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchService = void 0;
const axios_1 = __importDefault(require("axios"));
class FetchService {
    constructor(_loggerService) {
        this._loggerService = _loggerService;
        this.client = axios_1.default.create();
        _loggerService.info('Fetch service initialized');
    }
    getClient() {
        return this.client;
    }
    GET(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = this.client.get(url, config);
            return response
                .then((data) => data)
                .catch((e) => {
                throw new Error(`${(e.code, e.message)}`);
            });
        });
    }
    POST(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = this.client.post(url, data, config);
            return response
                .then((data) => data)
                .catch((e) => {
                throw new Error(`${(e.code, e.message)}`);
            });
        });
    }
    PUT(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = this.client.put(url, data, config);
            return response
                .then((data) => data)
                .catch((e) => {
                throw new Error(`${(e.code, e.message)}`);
            });
        });
    }
    DELETE(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = this.client.delete(url, config);
            return response
                .then((data) => data)
                .catch((e) => {
                throw new Error(`${(e.code, e.message)}`);
            });
        });
    }
}
exports.FetchService = FetchService;
