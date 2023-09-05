"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myBot = void 0;
const grammy_1 = require("grammy");
const conversations_1 = require("@grammyjs/conversations");
const storage_file_1 = require("@grammyjs/storage-file");
const commands_list_1 = require("./helpers/commands-list");
class myBot {
    constructor(_configService, _conversationFactory) {
        this._configService = _configService;
        this._conversationFactory = _conversationFactory;
        this.instance = new grammy_1.Bot(this._configService.get('BOT_SECRET'));
        this.instance.use((0, grammy_1.session)({
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
            storage: (0, grammy_1.enhanceStorage)({
                storage: new storage_file_1.FileAdapter({
                    dirName: '../../session',
                }),
                millisecondsToLive: 60 * 1000,
            }),
        }));
        this.instance.use((0, conversations_1.conversations)());
        this.instance.api.setMyCommands(commands_list_1.commandList);
        this.ListOfConversations = this._conversationFactory.createConversation();
        this.ListOfConversations.forEach((el) => {
            this.instance.use((0, conversations_1.createConversation)(el.handle.bind(el), {
                id: el.getName(),
            }));
        });
    }
}
exports.myBot = myBot;
