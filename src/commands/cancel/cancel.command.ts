import { injected } from 'brandi';
import { IConfigService } from '../../common/interfaces/config.service.interface';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';
import { Command } from '../command';
import { IProductService } from '../../product/interfaces/product-service.interface';

export class CancelCommand extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _configService: IConfigService,
    private readonly _loggerService: ILoggerService,
    private readonly _productService: IProductService,
  ) {
    super(_bot.instance);

    this._loggerService.info('Cancel command initialized');
  }

  handle(): void {
    this.bot.command('cancel', async (ctx) => {
      const adminsID = this._configService.get('ADMIN_ID').split(',');

      if (!ctx.msg.from) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      const isAdmin = adminsID.includes(ctx.msg.from.id.toString());

      if (!isAdmin) return await ctx.reply('No access');
    });

    /* this.bot.on(':photo', async (ctx) => {
      if (!ctx.msg.photo) return;

      const photo = ctx.msg.photo;

      let largestObject = null;

      for (const obj of photo) {
        if (!largestObject || (obj.file_size as number) > (largestObject.file_size as number)) {
          largestObject = obj;
        }
      }

      const arr: { id: string }[] = [];

      if (!largestObject) return;

      arr.push({
        id: largestObject.file_id,
      });

      await this._productService.createImage(arr, 3);
    }); */
  }
}

injected(
  CancelCommand,
  TOKENS.bot,
  TOKENS.configService,
  TOKENS.loggerService,
  TOKENS.productService,
);
