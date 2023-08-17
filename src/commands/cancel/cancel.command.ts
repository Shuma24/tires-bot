import { injected } from 'brandi';
import { IConfigService } from '../../common/interfaces/config.service.interface';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';
import { Command } from '../command';

export class CancelCommand extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _configService: IConfigService,
    private readonly _loggerService: ILoggerService,
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

      await ctx.conversation.exit('addProduct');
      await ctx.reply('Сесію скасовано');
    });
  }
}

injected(CancelCommand, TOKENS.bot, TOKENS.configService, TOKENS.loggerService);
