"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = void 0;
const brandi_1 = require("brandi");
exports.TOKENS = {
    app: (0, brandi_1.token)('app'),
    bot: (0, brandi_1.token)('bot'),
    loggerService: (0, brandi_1.token)('loggerService'),
    configService: (0, brandi_1.token)('configService'),
    startCommand: (0, brandi_1.token)('startCommand'),
    ormService: (0, brandi_1.token)('ormService'),
    fetchService: (0, brandi_1.token)('fetchService'),
    productRepository: (0, brandi_1.token)('productRepository'),
    productService: (0, brandi_1.token)('productService'),
    addProductCommand: (0, brandi_1.token)('addProductCommand'),
    storage: (0, brandi_1.token)('storage'),
    addProductConversation: (0, brandi_1.token)('addProductConversation'),
    orderProductConversation: (0, brandi_1.token)('orderProductConversation'),
    imageCommand: (0, brandi_1.token)('imageCommand'),
    SetProductsImageConversation: (0, brandi_1.token)('setProductImage'),
    DeleteProductCommand: (0, brandi_1.token)('deleteProductCommand'),
    DeleteProductConversation: (0, brandi_1.token)('deleteProductConversation'),
    UpdateProductCommand: (0, brandi_1.token)('updateProductCommand'),
    UpdateProductConversation: (0, brandi_1.token)('updateProductConversation'),
    getProductCommand: (0, brandi_1.token)('getProductCommand'),
    getProductConversation: (0, brandi_1.token)('getProductConversation'),
    banCommand: (0, brandi_1.token)('banCommand'),
    banConversation: (0, brandi_1.token)('banConversation'),
    unbanCommand: (0, brandi_1.token)('unBanCommand'),
    unbanConversation: (0, brandi_1.token)('unBanConversation'),
    commandFactory: (0, brandi_1.token)('CommandFactory'),
    conversationFactory: (0, brandi_1.token)('ConversationFactory'),
    adminRepository: (0, brandi_1.token)('adminRepository'),
    adminService: (0, brandi_1.token)('adminService'),
    blackListService: (0, brandi_1.token)('blackListService'),
    blackListRepository: (0, brandi_1.token)('blackListRepository'),
};