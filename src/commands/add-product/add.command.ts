import { injected } from 'brandi';
import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';
import { Command } from '../command';
import { IConfigService } from '../../common/interfaces/config.service.interface';

import { readyRegex } from '../helpers/regexs';

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
      if (!ctx.msg.from) {
        return await ctx.reply('Вийшла помилка спробуйте ще раз');
      }

      const adminsID = this._configService.get('ADMIN_ID').split(',');

      const userID = ctx.msg.from?.id.toString();

      if (!adminsID.includes(userID)) {
        return await ctx.reply('No access for this command');
      }

      return await ctx.reply('Закинь фото коли вони загрузяться напиши "готово"');
    });

    this.bot.on(':photo', (ctx) => {
      if (!ctx.msg.photo || !ctx.msg.photo.length) {
        return ctx.reply('Проблема із заватнаженням фото');
      }

      if (!ctx.session.images.length || ctx.session.images.length) ctx.session.images = [];

      let largestObject = null;

      for (const obj of ctx.msg.photo) {
        if (!largestObject || (obj.file_size as number) > (largestObject.file_size as number)) {
          largestObject = obj;
        }
      }

      if (largestObject) {
        ctx.session.images.push({
          id: largestObject.file_unique_id,
        });
      } else {
        return ctx.reply('Проблема із заватнаженням фото');
      }

      console.log(ctx.session.images);

      return ctx.reply('Пиши готово якшо все ок');
    });

    this.bot.hears(readyRegex, (ctx) => {
      ctx.reply('Супер пора ввести інші дані');
    });
  }
}

injected(AddProduct, TOKENS.bot, TOKENS.loggerService, TOKENS.configService);
