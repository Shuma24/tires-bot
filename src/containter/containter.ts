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
import { AddProduct } from '../commands/add-product/add.command';
import { S3Storage } from '../storage/storage.service';
import { FetchService } from '../fetch/fetch.service';
import { AddProductConversation } from '../conversations/add-product/add.conversation';

export const container = new Container();

container.bind(TOKENS.app).toInstance(Application).inSingletonScope();
container.bind(TOKENS.bot).toInstance(myBot).inSingletonScope();
container.bind(TOKENS.loggerService).toInstance(LoggerService).inSingletonScope();
container.bind(TOKENS.configService).toInstance(ConfigService).inSingletonScope();
container.bind(TOKENS.startCommand).toInstance(StartCommand).inSingletonScope();
container.bind(TOKENS.ormService).toInstance(ORMService).inSingletonScope();
container.bind(TOKENS.productRepository).toInstance(ProductRepository).inSingletonScope();
container.bind(TOKENS.productService).toInstance(ProductService).inSingletonScope();
container.bind(TOKENS.addProductCommand).toInstance(AddProduct).inSingletonScope();
container.bind(TOKENS.storage).toInstance(S3Storage).inSingletonScope();
container.bind(TOKENS.fetchService).toInstance(FetchService).inSingletonScope();
container.bind(TOKENS.addProductConversation).toInstance(AddProductConversation).inSingletonScope();
