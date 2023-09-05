"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const winston_1 = __importDefault(require("winston"));
class LoggerService {
    constructor() {
        this.Logger = winston_1.default.createLogger({
            transports: [
                new winston_1.default.transports.Console({ format: winston_1.default.format.colorize({ all: true }) }),
            ],
            format: winston_1.default.format.combine(winston_1.default.format.colorize({
                all: true,
            }), winston_1.default.format.label({
                label: '[LOGGER]',
            }), winston_1.default.format.timestamp({
                format: 'YY-MM-DD HH:mm:ss',
            }), winston_1.default.format.printf((info) => `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`)),
        });
    }
    info(message) {
        this.Logger.log('info', message);
    }
    error(message) {
        this.Logger.log('error', message);
    }
    warn(message) {
        this.Logger.log('warn', message);
    }
}
exports.LoggerService = LoggerService;
