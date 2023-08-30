import { BaseConversation } from '../conversation';

export interface IConversationFactory {
  createConversation(): BaseConversation[];
}
