"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkType = void 0;
const checkType = (type) => {
    switch (type) {
        case '☀️ Літо':
            return 'summer';
        case '❄️ Зима':
            return 'winter';
        case '🌤 Всесезонні':
            return 'allseason';
        default:
            return null;
    }
};
exports.checkType = checkType;
