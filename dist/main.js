"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapper_1 = require("./containter/wrapper");
const tokens_1 = require("./containter/tokens");
const main = () => {
    const app = wrapper_1.wrapper.get(tokens_1.TOKENS.app);
    app.init();
};
main();
