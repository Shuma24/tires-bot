import { injected } from 'brandi';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';
import { Command } from '../command';
import { IConfigService } from '../../common/interfaces/config.service.interface';

//import { readyRegex } from '../helpers/regexs';

export class AddProduct extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _configService: IConfigService,
  ) {
    super(_bot.instance);

    this._loggerService.info('Add Product command initialized');
  }

  handle(): void {
    this.bot.command('add', async (ctx) => {
      const adminsID = this._configService.get('ADMIN_ID').split(',');

      if (!ctx.msg.from) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      const isAdmin = adminsID.includes(ctx.msg.from.id.toString());

      if (!isAdmin) return await ctx.reply('No access');

      await ctx.conversation.enter('addProduct');
    });
  }
}

injected(AddProduct, TOKENS.bot, TOKENS.loggerService, TOKENS.configService);
