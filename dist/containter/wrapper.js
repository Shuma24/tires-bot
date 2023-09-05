"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapper = void 0;
const brandi_1 = require("brandi");
const tokens_1 = require("./tokens");
const product_module_1 = require("../product/product.module");
const storage_module_1 = require("../storage/storage.module");
const core_module_1 = require("../core/core.module");
const conversation_module_1 = require("../conversations/conversation.module");
const bot_module_1 = require("../bot/bot.module");
const command_module_1 = require("../commands/command.module");
const db_module_1 = require("../dataBase/db.module");
const admin_module_1 = require("../admin/admin.module");
const black_list_module_1 = require("../black-list/black-list.module");
exports.wrapper = new brandi_1.Container();
//core
exports.wrapper.use(tokens_1.TOKENS.app).from(core_module_1.coreModule);
exports.wrapper.use(tokens_1.TOKENS.loggerService).from(core_module_1.coreModule);
exports.wrapper.use(tokens_1.TOKENS.configService).from(core_module_1.coreModule);
exports.wrapper.use(tokens_1.TOKENS.fetchService).from(core_module_1.coreModule);
//bot
exports.wrapper.use(tokens_1.TOKENS.bot).from(bot_module_1.botModule);
//database
exports.wrapper.use(tokens_1.TOKENS.ormService).from(db_module_1.dataBaseModule);
//product
exports.wrapper.use(tokens_1.TOKENS.productService).from(product_module_1.productModule);
exports.wrapper.use(tokens_1.TOKENS.productRepository).from(product_module_1.productModule);
//storage
exports.wrapper.use(tokens_1.TOKENS.storage).from(storage_module_1.storageModule);
//command
exports.wrapper.use(tokens_1.TOKENS.addProductCommand).from(command_module_1.commandModule);
exports.wrapper.use(tokens_1.TOKENS.banCommand).from(command_module_1.commandModule);
exports.wrapper.use(tokens_1.TOKENS.DeleteProductCommand).from(command_module_1.commandModule);
exports.wrapper.use(tokens_1.TOKENS.getProductCommand).from(command_module_1.commandModule);
exports.wrapper.use(tokens_1.TOKENS.imageCommand).from(command_module_1.commandModule);
exports.wrapper.use(tokens_1.TOKENS.startCommand).from(command_module_1.commandModule);
exports.wrapper.use(tokens_1.TOKENS.unbanCommand).from(command_module_1.commandModule);
exports.wrapper.use(tokens_1.TOKENS.UpdateProductCommand).from(command_module_1.commandModule);
exports.wrapper.use(tokens_1.TOKENS.commandFactory).from(command_module_1.commandModule);
//conversation
exports.wrapper.use(tokens_1.TOKENS.addProductConversation).from(conversation_module_1.conversationModule);
exports.wrapper.use(tokens_1.TOKENS.banConversation).from(conversation_module_1.conversationModule);
exports.wrapper.use(tokens_1.TOKENS.DeleteProductConversation).from(conversation_module_1.conversationModule);
exports.wrapper.use(tokens_1.TOKENS.getProductConversation).from(conversation_module_1.conversationModule);
exports.wrapper.use(tokens_1.TOKENS.orderProductConversation).from(conversation_module_1.conversationModule);
exports.wrapper.use(tokens_1.TOKENS.SetProductsImageConversation).from(conversation_module_1.conversationModule);
exports.wrapper.use(tokens_1.TOKENS.unbanConversation).from(conversation_module_1.conversationModule);
exports.wrapper.use(tokens_1.TOKENS.UpdateProductConversation).from(conversation_module_1.conversationModule);
exports.wrapper.use(tokens_1.TOKENS.conversationFactory).from(conversation_module_1.conversationModule);
//admin
exports.wrapper.use(tokens_1.TOKENS.adminService).from(admin_module_1.adminModule);
exports.wrapper.use(tokens_1.TOKENS.adminRepository).from(admin_module_1.adminModule);
//blackList
exports.wrapper.use(tokens_1.TOKENS.blackListService).from(black_list_module_1.blackListModule);
exports.wrapper.use(tokens_1.TOKENS.blackListRepository).from(black_list_module_1.blackListModule);
