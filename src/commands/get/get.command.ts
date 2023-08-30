import { Command } from '../command';

import { ILoggerService } from '../../core/common/interfaces/logger.service.interface';
import { IBot } from '../../bot/interface/bot.interface';
import { IAdminService } from '../../admin/interfaces/admin-service.interface';

export class GetProduct extends Command {
  constructor(
    protected readonly _bot: IBot,
    private readonly _loggerService: ILoggerService,
    private readonly _adminService: IAdminService,
  ) {
    super(_bot.instance, _loggerService);
  }

  handle(): void {
    this.bot.command('get', async (ctx) => {
      const listOfAdmins = await this._adminService.getAll();

      if (!ctx.message?.from) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      if (!listOfAdmins) {
        return await ctx.reply('Не встановлено адмінів або проблема з ДБ');
      }

      const isAdmin = listOfAdmins.find(
        (el) => el.TelegramID === Number(ctx.message.from.id.toString()),
      );

      if (!isAdmin) return await ctx.reply('No access');

      await ctx.conversation.enter('getProduct');
    });
  }
}
