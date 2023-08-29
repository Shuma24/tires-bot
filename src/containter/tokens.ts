import { token } from 'brandi';
import { ILoggerService } from '../common/interfaces/logger.service.interface';
import { IConfigService } from '../common/interfaces/config.service.interface';
import { Application } from '../app';
import { Command } from '../commands/command';
import { IBot } from '../tg-bot/interface/bot.interface';

import { IORMService } from '../dataBase/orm.interface';
import { IProductRepository } from '../product/interfaces/product-repository.interface';
import { IProductService } from '../product/interfaces/product-service.interface';
import { IStorage } from '../storage/interfaces/storage.interfaces';
import { BaseConversation } from '../conversations/conversation';
import { IFetchService } from '../common/fetch/interfaces/fetch.interface';

export const TOKENS = {
  app: token<Application>('app'),
  bot: token<IBot>('bot'),
  loggerService: token<ILoggerService>('loggerService'),
  configService: token<IConfigService>('configService'),
  startCommand: token<Command>('startCommand'),
  ormService: token<IORMService>('ormService'),
  fetchService: token<IFetchService>('fetchService'),
  productRepository: token<IProductRepository>('productRepository'),
  productService: token<IProductService>('productService'),
  addProductCommand: token<Command>('addProductCommand'),
  storage: token<IStorage>('storage'),
  addProductConversation: token<BaseConversation>('addProductConversation'),
  orderProductConversation: token<BaseConversation>('orderProductConversation'),
  imageCommand: token<Command>('imageCommand'),
  SetProductsImageConversation: token<BaseConversation>('setProductImage'),
  DeleteProductCommand: token<Command>('deleteProductCommand'),
  DeleteProductConversation: token<BaseConversation>('deleteProductConversation'),
  UpdateProductCommand: token<Command>('updateProductCommand'),
  UpdateProductConversation: token<BaseConversation>('updateProductConversation'),
  getProductCommand: token<Command>('getProductCommand'),
  getProductConversation: token<BaseConversation>('getProductConversation'),
  banCommand: token<Command>('banCommand'),
  banConversation: token<BaseConversation>('banConversation'),
  unbanCommand: token<Command>('unBanCommand'),
  unbanConversation: token<BaseConversation>('unBanConversation'),
};
