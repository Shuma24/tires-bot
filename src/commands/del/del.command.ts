import { injected } from 'brandi';
import { IConfigService } from '../../common/interfaces/config.service.interface';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { IBot } from '../../tg-bot/interface/bot.interface';
import { Command } from '../command';
import { adminCheck } from '../helpers/admin-check';
import { TOKENS } from '../../containter/tokens';

export class DeleteProduct extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _configService: IConfigService,
  ) {
    super(_bot.instance, _loggerService);
  }

  handle(): void {
    this.bot.command('del', async (ctx) => {
      const adminsID = this._configService.get('ADMIN_ID');

      if (!ctx.msg.from) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      const isAdmin = adminCheck(adminsID, ctx.msg.from.id.toString());

      if (!isAdmin) return await ctx.reply('No access');

      await ctx.conversation.enter('delProduct');
    });
  }
}

injected(DeleteProduct, TOKENS.bot, TOKENS.loggerService, TOKENS.configService);
