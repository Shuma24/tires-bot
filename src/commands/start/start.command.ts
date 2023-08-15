import { Command } from '../command';
import { injected } from 'brandi';
import { TOKENS } from '../../containter/tokens';
import { IBot } from '../../tg-bot/interface/bot.interface';

import { ILoggerService } from '../../common/interfaces/logger.service.interface';
import {
  heightButtons,
  radiusButtons,
  seasonButtons,
  startButtons,
  widthButtons,
} from './helpers/buttons';

export class StartCommand extends Command {
  constructor(protected readonly _bot: IBot, private readonly _loggerService: ILoggerService) {
    super(_bot.instance);

    this._loggerService.info('Start command initialized');
  }

  handle(): void {
    this.bot.command('start', async (ctx) => {
      await ctx.reply('Привіт ✌🏻');
      await ctx.reply('Я допоможу тобі із підбором шин до твого 🚗');

      await ctx.reply('Виберіть опцію:', {
        reply_markup: {
          keyboard: startButtons,
          resize_keyboard: true,
        },
      });

      ctx.session.lastActivity = new Date().toISOString();
    });

    this.bot.hears('📞 Контакти', (ctx) => {
      ctx.reply(`Наші номера телефонів: 
      +380XXXXXXXXX 📞;
      +380XXXXXXXXX 📞;
      +380XXXXXXXXX 📞.`);
    });

    this.bot.hears('Корисний лінк для авто', (ctx) => {
      ctx.reply('https://xpart.in.ua/');
    });

    this.bot.hears('🔍 Підібрати шини', async (ctx) => {
      await ctx.reply('Шини якого сезону Вам потрібні?', {
        reply_markup: {
          keyboard: seasonButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    this.bot.hears(/(☀️ Літо|❄️ Зима|🌤 Всесезонні)/, (ctx) => {
      switch (ctx.message.text) {
        case '☀️ Літо':
          ctx.session.type = 'summer';

          break;

        case '❄️ Зима':
          ctx.session.type = 'winter';
          break;

        case '🌤 Всесезонні':
          ctx.session.type = 'allseason';
          break;

        default:
          break;
      }

      ctx.reply('Оберіть ДІАМЕТР', {
        reply_markup: {
          keyboard: radiusButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    this.bot.hears(/(R14|R15|R16|R17|R17.5|R18|R19|R20|R21|R22|R23)/, (ctx) => {
      ctx.session.radius = Number(ctx.message.text.replace(/R/, ''));

      ctx.reply('Оберіть ШИРИНУ', {
        reply_markup: {
          keyboard: widthButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    this.bot.hears(/\d{3}/, (ctx) => {
      ctx.session.width = Number(ctx.message.text);

      ctx.reply('Оберіть потрібну ВИСОТУ ПРОФІЛЯ', {
        reply_markup: {
          keyboard: heightButtons,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    this.bot.hears('20', (ctx) => {
      ctx.session.height = Number(ctx.message.text);

      ctx.reply(`${ctx.session.type}`, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    });
  }
}

injected(StartCommand, TOKENS.bot, TOKENS.loggerService);
