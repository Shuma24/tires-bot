import { injected } from 'brandi';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';
import { Command } from '../command';
import { IConfigService } from '../../common/interfaces/config.service.interface';
import { adminCheck } from '../helpers/admin-check';

export class AddProduct extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _configService: IConfigService,
  ) {
    super(_bot.instance, _loggerService);
  }

  handle(): void {
    this.bot.command('add', async (ctx) => {
      const adminsID = this._configService.get('ADMIN_ID');

      if (!ctx.msg.from) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      const isAdmin = adminCheck(adminsID, ctx.msg.from.id.toString());

      if (!isAdmin) return await ctx.reply('No access');

      await ctx.conversation.enter('addProduct');

      return;
    });
  }
}

injected(AddProduct, TOKENS.bot, TOKENS.loggerService, TOKENS.configService);
