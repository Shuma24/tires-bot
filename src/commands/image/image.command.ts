import { injected } from 'brandi';
import { IConfigService } from '../../common/interfaces/config.service.interface';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';
import { Command } from '../command';
import { IProductService } from '../../product/interfaces/product-service.interface';
import { adminCheck } from '../helpers/admin-check';

export class ImageCommand extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _configService: IConfigService,
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_bot.instance, _loggerService);
  }

  handle(): void {
    this.bot.command('image', async (ctx) => {
      const adminsID = this._configService.get('ADMIN_ID');

      if (!ctx.msg.from) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      const isAdmin = adminCheck(adminsID, ctx.msg.from.id.toString());

      if (!isAdmin) return await ctx.reply('No access');

      await ctx.conversation.enter('setProductImage');
    });
  }
}

injected(
  ImageCommand,
  TOKENS.bot,
  TOKENS.configService,
  TOKENS.loggerService,
  TOKENS.productService,
);
