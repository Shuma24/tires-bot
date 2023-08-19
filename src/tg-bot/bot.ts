import { Bot, enhanceStorage, session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';

import { IConfigService } from '../common/interfaces/config.service.interface';
import { IBot } from './interface/bot.interface';
import { injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { IBotContext } from './interface/bot-context.interface';
import { FileAdapter } from '@grammyjs/storage-file';
import { commandList } from './helpers/commands-list';
import { BaseConversation } from '../conversations/conversation';

export class myBot implements IBot {
  instance: Bot<IBotContext>;
  ListOfConversations: BaseConversation[];

  constructor(
    private readonly _configService: IConfigService,
    private readonly _addProductConversation: BaseConversation,
  ) {
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
          pages: 0,
        }),
        storage: enhanceStorage({
          storage: new FileAdapter({
            dirName: '../../session',
          }),
          millisecondsToLive: 60 * 1000,
        }),
      }),
    );
    this.instance.use(conversations());
    this.instance.api.setMyCommands(commandList);

    this.ListOfConversations = [_addProductConversation];

    this.ListOfConversations.forEach((el) => {
      this.instance.use(
        createConversation(el.handle.bind(el), {
          id: el.getName(),
        }),
      );
    });
  }
}

injected(myBot, TOKENS.configService, TOKENS.addProductConversation);
