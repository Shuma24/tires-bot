import { token } from 'brandi';

import { Command } from '../commands/command';

import { IORMService } from '../dataBase/orm.interface';
import { IProductRepository } from '../product/interfaces/product-repository.interface';
import { IProductService } from '../product/interfaces/product-service.interface';
import { IStorage } from '../storage/interfaces/storage.interfaces';
import { BaseConversation } from '../conversations/conversation';
import { Application } from '../core/app';
import { ILoggerService } from '../core/common/interfaces/logger.service.interface';
import { IConfigService } from '../core/common/interfaces/config.service.interface';
import { IFetchService } from '../core/common/fetch/interfaces/fetch.interface';
import { IBot } from '../bot/interface/bot.interface';
import { ICommandFactory } from '../commands/interfaces/factory.interface';
import { IConversationFactory } from '../conversations/interfaces/conversation-factory.interface';
import { IAdminService } from '../admin/interfaces/admin-service.interface';
import { IAdminRepository } from '../admin/interfaces/admin-repository.interface';
import { IBlackListService } from '../black-list/interfaces/black-list.service.interface';
import { IBlackListRepository } from '../black-list/interfaces/black-list.repository.interface';

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
  commandFactory: token<ICommandFactory>('CommandFactory'),
  conversationFactory: token<IConversationFactory>('ConversationFactory'),
  adminRepository: token<IAdminRepository>('adminRepository'),
  adminService: token<IAdminService>('adminService'),
  blackListService: token<IBlackListService>('blackListService'),
  blackListRepository: token<IBlackListRepository>('blackListRepository'),
};
