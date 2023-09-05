import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { AddProduct } from './add/add.command';
import { BanUsers } from './ban/ban.command';
import { DeleteProduct } from './del/del.command';
import { GetProduct } from './get/get.command';
import { ImageCommand } from './image/image.command';
import { StartCommand } from './start/start.command';
import { UnbanUsers } from './unban/unban.command';
import { UpdateProduct } from './upd/upd.command';
import { CommandFactory } from './command.factory';

export const commandModule = new DependencyModule();

commandModule.bind(TOKENS.addProductCommand).toInstance(AddProduct).inSingletonScope();
commandModule.bind(TOKENS.banCommand).toInstance(BanUsers).inSingletonScope();
commandModule.bind(TOKENS.DeleteProductCommand).toInstance(DeleteProduct).inSingletonScope();
commandModule.bind(TOKENS.getProductCommand).toInstance(GetProduct).inSingletonScope();
commandModule.bind(TOKENS.imageCommand).toInstance(ImageCommand).inSingletonScope();
commandModule.bind(TOKENS.startCommand).toInstance(StartCommand).inSingletonScope();
commandModule.bind(TOKENS.unbanCommand).toInstance(UnbanUsers).inSingletonScope();
commandModule.bind(TOKENS.UpdateProductCommand).toInstance(UpdateProduct).inSingletonScope();
commandModule.bind(TOKENS.commandFactory).toInstance(CommandFactory).inSingletonScope();

injected(AddProduct, TOKENS.bot, TOKENS.loggerService, TOKENS.adminService);
injected(BanUsers, TOKENS.bot, TOKENS.loggerService, TOKENS.adminService);
injected(DeleteProduct, TOKENS.bot, TOKENS.loggerService, TOKENS.adminService);
injected(GetProduct, TOKENS.bot, TOKENS.loggerService, TOKENS.adminService);
injected(ImageCommand, TOKENS.bot, TOKENS.adminService, TOKENS.loggerService);
injected(
  StartCommand,
  TOKENS.bot,
  TOKENS.loggerService,
  TOKENS.productService,
  TOKENS.blackListService,
);
injected(UnbanUsers, TOKENS.bot, TOKENS.loggerService, TOKENS.adminService);
injected(UpdateProduct, TOKENS.bot, TOKENS.loggerService, TOKENS.adminService);
injected(
  CommandFactory,
  TOKENS.startCommand,
  TOKENS.addProductCommand,
  TOKENS.imageCommand,
  TOKENS.DeleteProductCommand,
  TOKENS.UpdateProductCommand,
  TOKENS.getProductCommand,
  TOKENS.banCommand,
  TOKENS.unbanCommand,
);
