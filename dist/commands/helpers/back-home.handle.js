"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBackHomeButtons = void 0;
const buttons_1 = require("../../helpers/buttons");
const width_button_generator_1 = require("../../helpers/width-button.generator");
const handleBackHomeButtons = (message, radius) => {
    const set = {
        '🔙 Назад': {
            text: 'Ви повернулися назад',
            buttons: buttons_1.startButtons,
        },
        '⬅️ Назад': {
            text: 'Ви повернулися назад',
            buttons: buttons_1.seasonButtons,
        },
        '↩️ Назад': {
            text: 'Ви повернулися назад',
            buttons: buttons_1.radiusButtons,
        },
        '👈🏻 Назад': {
            text: 'Ви повернулися назад',
            buttons: (0, width_button_generator_1.generateWidthTires)(radius),
        },
        '🏠 Home': {
            text: 'Ви на головній',
            buttons: buttons_1.startButtons,
        },
    };
    const isHasValue = set[message];
    if (!isHasValue)
        return null;
    return isHasValue;
};
exports.handleBackHomeButtons = handleBackHomeButtons;
