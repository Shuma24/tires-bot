import { Container } from 'brandi';
import { TOKENS } from './tokens';
import { productModule } from '../product/product.module';
import { storageModule } from '../storage/storage.module';
import { coreModule } from '../core/core.module';
import { conversationModule } from '../conversations/conversation.module';
import { botModule } from '../bot/bot.module';
import { commandModule } from '../commands/command.module';
import { dataBaseModule } from '../dataBase/db.module';
import { adminModule } from '../admin/admin.module';
import { blackListModule } from '../black-list/black-list.module';

export const wrapper = new Container();

//core
wrapper.use(TOKENS.app).from(coreModule);
wrapper.use(TOKENS.loggerService).from(coreModule);
wrapper.use(TOKENS.configService).from(coreModule);
wrapper.use(TOKENS.fetchService).from(coreModule);

//bot
wrapper.use(TOKENS.bot).from(botModule);

//database
wrapper.use(TOKENS.ormService).from(dataBaseModule);

//product
wrapper.use(TOKENS.productService).from(productModule);
wrapper.use(TOKENS.productRepository).from(productModule);

//storage
wrapper.use(TOKENS.storage).from(storageModule);

//command
wrapper.use(TOKENS.addProductCommand).from(commandModule);
wrapper.use(TOKENS.banCommand).from(commandModule);
wrapper.use(TOKENS.DeleteProductCommand).from(commandModule);
wrapper.use(TOKENS.getProductCommand).from(commandModule);
wrapper.use(TOKENS.imageCommand).from(commandModule);
wrapper.use(TOKENS.startCommand).from(commandModule);
wrapper.use(TOKENS.unbanCommand).from(commandModule);
wrapper.use(TOKENS.UpdateProductCommand).from(commandModule);
wrapper.use(TOKENS.commandFactory).from(commandModule);

//conversation
wrapper.use(TOKENS.addProductConversation).from(conversationModule);
wrapper.use(TOKENS.banConversation).from(conversationModule);
wrapper.use(TOKENS.DeleteProductConversation).from(conversationModule);
wrapper.use(TOKENS.getProductConversation).from(conversationModule);
wrapper.use(TOKENS.orderProductConversation).from(conversationModule);
wrapper.use(TOKENS.SetProductsImageConversation).from(conversationModule);
wrapper.use(TOKENS.unbanConversation).from(conversationModule);
wrapper.use(TOKENS.UpdateProductConversation).from(conversationModule);
wrapper.use(TOKENS.conversationFactory).from(conversationModule);

//admin
wrapper.use(TOKENS.adminService).from(adminModule);
wrapper.use(TOKENS.adminRepository).from(adminModule);

//blackList
wrapper.use(TOKENS.blackListService).from(blackListModule);
wrapper.use(TOKENS.blackListRepository).from(blackListModule);
