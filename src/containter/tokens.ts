import { token } from 'brandi';
import { ILoggerService } from '../common/interfaces/logger.service.interface';
import { IConfigService } from '../common/interfaces/config.service.interface';
import { Application } from '../app';
import { Command } from '../commands/command';
import { IBot } from '../tg-bot/interface/bot.interface';

import { IORMService } from '../dataBase/orm.interface';
import { IProductRepository } from '../product/interfaces/product-respository.interface';
import { IProductService } from '../product/interfaces/product-service.interface';

export const TOKENS = {
  app: token<Application>('app'),
  bot: token<IBot>('bot'),
  loggerService: token<ILoggerService>('loggerService'),
  configService: token<IConfigService>('configService'),
  startCommand: token<Command>('startCommand'),

  ormService: token<IORMService>('ormService'),
  productRepository: token<IProductRepository>('productRepository'),
  productService: token<IProductService>('productService'),
  addProductCommand: token<Command>('addProductCommand'),
};
