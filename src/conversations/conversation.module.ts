import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { AddProductConversation } from './add-product/add.conversation';
import { BanConversation } from './ban-user/ban.conversation';
import { DeleteProductConversation } from './del-product/delete.conversation';
import { GetProductConversation } from './get-products/get.conversation';
import { OrderProductsConversation } from './order-product/order.conversation';
import { SetProductsImageConversation } from './set-product-image/set-product-image.conversation';
import { UnBanConversation } from './unban-users/unban.conversation';
import { UpdateProductConversation } from './upd-product/update.conversation';
import { ConversationFactory } from './conversation.factory';

export const conversationModule = new DependencyModule();

conversationModule
  .bind(TOKENS.addProductConversation)
  .toInstance(AddProductConversation)
  .inSingletonScope();

conversationModule.bind(TOKENS.banConversation).toInstance(BanConversation).inSingletonScope();

conversationModule
  .bind(TOKENS.DeleteProductConversation)
  .toInstance(DeleteProductConversation)
  .inSingletonScope();

conversationModule
  .bind(TOKENS.getProductConversation)
  .toInstance(GetProductConversation)
  .inSingletonScope();

conversationModule
  .bind(TOKENS.orderProductConversation)
  .toInstance(OrderProductsConversation)
  .inSingletonScope();

conversationModule
  .bind(TOKENS.SetProductsImageConversation)
  .toInstance(SetProductsImageConversation)
  .inSingletonScope();

conversationModule.bind(TOKENS.unbanConversation).toInstance(UnBanConversation).inSingletonScope();

conversationModule
  .bind(TOKENS.UpdateProductConversation)
  .toInstance(UpdateProductConversation)
  .inSingletonScope();

conversationModule
  .bind(TOKENS.conversationFactory)
  .toInstance(ConversationFactory)
  .inSingletonScope();

//inject
injected(AddProductConversation, TOKENS.productService, TOKENS.loggerService);
injected(DeleteProductConversation, TOKENS.loggerService, TOKENS.productService);
injected(GetProductConversation, TOKENS.loggerService, TOKENS.productService);
injected(
  OrderProductsConversation,
  TOKENS.loggerService,
  TOKENS.productService,
  TOKENS.adminService,
);
injected(SetProductsImageConversation, TOKENS.loggerService, TOKENS.productService);
injected(UnBanConversation, TOKENS.loggerService, TOKENS.blackListService);
injected(UpdateProductConversation, TOKENS.loggerService, TOKENS.productService);
injected(BanConversation, TOKENS.loggerService, TOKENS.blackListService);

injected(
  ConversationFactory,
  TOKENS.addProductConversation,
  TOKENS.orderProductConversation,
  TOKENS.SetProductsImageConversation,
  TOKENS.DeleteProductConversation,
  TOKENS.UpdateProductConversation,
  TOKENS.getProductConversation,
  TOKENS.banConversation,
  TOKENS.unbanConversation,
);
