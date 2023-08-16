import { Bot, enhanceStorage, session } from 'grammy';

import { IConfigService } from '../common/interfaces/config.service.interface';
import { IBot } from './interface/bot.interface';
import { injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { IBotContext } from './interface/bot-context.interface';
import { FileAdapter } from '@grammyjs/storage-file';
import { commandList } from './helpers/commands-list';

export class myBot implements IBot {
  instance: Bot<IBotContext>;

  constructor(private readonly _configService: IConfigService) {
    this.instance = new Bot(this._configService.get('BOT_SECRET'));
    this.instance.use(
      session({
        initial: () => ({
          name: '',
          width: 0,
          type: '',
          radius: 0,
          price: 0,
          description: '',
          height: 0,
          images: [],
        }),
        storage: enhanceStorage({
          storage: new FileAdapter({
            dirName: '../../session',
          }),
          millisecondsToLive: 30 * 60 * 1000,
        }),
      }),
    );
    this.instance.api.setMyCommands(commandList);
  }
}

injected(myBot, TOKENS.configService);
