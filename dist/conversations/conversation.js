"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConversation = void 0;
class BaseConversation {
    constructor(_loggerService) {
        _loggerService.info(`${this.getName()} conversation initialized`);
    }
}
exports.BaseConversation = BaseConversation;
