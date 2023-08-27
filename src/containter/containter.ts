import { Container } from 'brandi';
import { TOKENS } from './tokens';
import { LoggerService } from '../common/logger/logger.service';
import { ConfigService } from '../common/config/config.service';

import { StartCommand } from '../commands/start/start.command';

import { Application } from '../app';
import { myBot } from '../tg-bot/bot';

import { ORMService } from '../dataBase/orm.service';
import { ProductRepository } from '../product/product.repository';
import { ProductService } from '../product/product.service';
import { AddProduct } from '../commands/add/add.command';
import { S3Storage } from '../storage/storage.service';
import { AddProductConversation } from '../conversations/add-product/add.conversation';
import { ImageCommand } from '../commands/image/image.command';
import { OrderProductsConversation } from '../conversations/order-product/order.conversation';
import { SetProductsImageConversation } from '../conversations/set-product-image/set-product-image.conversation';
import { DeleteProduct } from '../commands/del/del.command';
import { DeleteProductConversation } from '../conversations/del-product/delete.conversation';
import { UpdateProduct } from '../commands/upd/upd.command';
import { UpdateProductConversation } from '../conversations/upd-product/update.conversation';
import { GetProduct } from '../commands/get/get.command';
import { GetProductConversation } from '../conversations/get-products/get.conversation';
import { FetchService } from '../common/fetch/fetch.service';

export const container = new Container();

container.bind(TOKENS.app).toInstance(Application).inSingletonScope();
container.bind(TOKENS.bot).toInstance(myBot).inSingletonScope();
container.bind(TOKENS.loggerService).toInstance(LoggerService).inSingletonScope();
container.bind(TOKENS.configService).toInstance(ConfigService).inSingletonScope();
container.bind(TOKENS.startCommand).toInstance(StartCommand).inTransientScope();
container.bind(TOKENS.ormService).toInstance(ORMService).inSingletonScope();
container.bind(TOKENS.productRepository).toInstance(ProductRepository).inSingletonScope();
container.bind(TOKENS.productService).toInstance(ProductService).inSingletonScope();
container.bind(TOKENS.addProductCommand).toInstance(AddProduct).inTransientScope();
container.bind(TOKENS.storage).toInstance(S3Storage).inSingletonScope();
container.bind(TOKENS.fetchService).toInstance(FetchService).inSingletonScope();
container.bind(TOKENS.addProductConversation).toInstance(AddProductConversation).inSingletonScope();
container.bind(TOKENS.imageCommand).toInstance(ImageCommand).inSingletonScope();
container
  .bind(TOKENS.orderProductConversation)
  .toInstance(OrderProductsConversation)
  .inTransientScope();
container
  .bind(TOKENS.SetProductsImageConversation)
  .toInstance(SetProductsImageConversation)
  .inSingletonScope();
container.bind(TOKENS.DeleteProductCommand).toInstance(DeleteProduct).inTransientScope();
container
  .bind(TOKENS.DeleteProductConversation)
  .toInstance(DeleteProductConversation)
  .inTransientScope();

container.bind(TOKENS.UpdateProductCommand).toInstance(UpdateProduct).inSingletonScope();
container
  .bind(TOKENS.UpdateProductConversation)
  .toInstance(UpdateProductConversation)
  .inSingletonScope();

container.bind(TOKENS.getProductCommand).toInstance(GetProduct).inSingletonScope();
container.bind(TOKENS.getProductConversation).toInstance(GetProductConversation).inSingletonScope();
