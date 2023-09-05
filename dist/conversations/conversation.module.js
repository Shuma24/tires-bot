"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationModule = void 0;
const brandi_1 = require("brandi");
const tokens_1 = require("../containter/tokens");
const add_conversation_1 = require("./add-product/add.conversation");
const ban_conversation_1 = require("./ban-user/ban.conversation");
const delete_conversation_1 = require("./del-product/delete.conversation");
const get_conversation_1 = require("./get-products/get.conversation");
const order_conversation_1 = require("./order-product/order.conversation");
const set_product_image_conversation_1 = require("./set-product-image/set-product-image.conversation");
const unban_conversation_1 = require("./unban-users/unban.conversation");
const update_conversation_1 = require("./upd-product/update.conversation");
const conversation_factory_1 = require("./conversation.factory");
exports.conversationModule = new brandi_1.DependencyModule();
exports.conversationModule
    .bind(tokens_1.TOKENS.addProductConversation)
    .toInstance(add_conversation_1.AddProductConversation)
    .inSingletonScope();
exports.conversationModule.bind(tokens_1.TOKENS.banConversation).toInstance(ban_conversation_1.BanConversation).inSingletonScope();
exports.conversationModule
    .bind(tokens_1.TOKENS.DeleteProductConversation)
    .toInstance(delete_conversation_1.DeleteProductConversation)
    .inSingletonScope();
exports.conversationModule
    .bind(tokens_1.TOKENS.getProductConversation)
    .toInstance(get_conversation_1.GetProductConversation)
    .inSingletonScope();
exports.conversationModule
    .bind(tokens_1.TOKENS.orderProductConversation)
    .toInstance(order_conversation_1.OrderProductsConversation)
    .inSingletonScope();
exports.conversationModule
    .bind(tokens_1.TOKENS.SetProductsImageConversation)
    .toInstance(set_product_image_conversation_1.SetProductsImageConversation)
    .inSingletonScope();
exports.conversationModule.bind(tokens_1.TOKENS.unbanConversation).toInstance(unban_conversation_1.UnBanConversation).inSingletonScope();
exports.conversationModule
    .bind(tokens_1.TOKENS.UpdateProductConversation)
    .toInstance(update_conversation_1.UpdateProductConversation)
    .inSingletonScope();
exports.conversationModule
    .bind(tokens_1.TOKENS.conversationFactory)
    .toInstance(conversation_factory_1.ConversationFactory)
    .inSingletonScope();
//inject
(0, brandi_1.injected)(add_conversation_1.AddProductConversation, tokens_1.TOKENS.productService, tokens_1.TOKENS.loggerService);
(0, brandi_1.injected)(delete_conversation_1.DeleteProductConversation, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.productService);
(0, brandi_1.injected)(get_conversation_1.GetProductConversation, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.productService);
(0, brandi_1.injected)(order_conversation_1.OrderProductsConversation, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.productService, tokens_1.TOKENS.adminService);
(0, brandi_1.injected)(set_product_image_conversation_1.SetProductsImageConversation, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.productService);
(0, brandi_1.injected)(unban_conversation_1.UnBanConversation, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.blackListService);
(0, brandi_1.injected)(update_conversation_1.UpdateProductConversation, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.productService);
(0, brandi_1.injected)(ban_conversation_1.BanConversation, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.blackListService);
(0, brandi_1.injected)(conversation_factory_1.ConversationFactory, tokens_1.TOKENS.addProductConversation, tokens_1.TOKENS.orderProductConversation, tokens_1.TOKENS.SetProductsImageConversation, tokens_1.TOKENS.DeleteProductConversation, tokens_1.TOKENS.UpdateProductConversation, tokens_1.TOKENS.getProductConversation, tokens_1.TOKENS.banConversation, tokens_1.TOKENS.unbanConversation);
