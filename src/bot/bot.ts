import { Bot, enhanceStorage, session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';

import { IBot } from './interface/bot.interface';
import { IBotContext } from './interface/bot-context.interface';
import { FileAdapter } from '@grammyjs/storage-file';
import { commandList } from './helpers/commands-list';
import { BaseConversation } from '../conversations/conversation';
import { IConfigService } from '../core/common/interfaces/config.service.interface';
import { IConversationFactory } from '../conversations/interfaces/conversation-factory.interface';

export class myBot implements IBot {
  instance: Bot<IBotContext>;
  ListOfConversations: BaseConversation[];

  constructor(
    private readonly _configService: IConfigService,
    private readonly _conversationFactory: IConversationFactory,
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
          productOrOrder: 0,
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

    this.ListOfConversations = this._conversationFactory.createConversation();

    this.ListOfConversations.forEach((el) => {
      this.instance.use(
        createConversation(el.handle.bind(el), {
          id: el.getName(),
        }),
      );
    });
  }
}
