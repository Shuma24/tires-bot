import { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import { Context, SessionFlavor } from 'grammy';

export interface ISessionData {
  type: string;
  radius: number;
  width: number;
  height: number;
  name: string;
  description: string;
  price: number;
  pages: number;
  images: [];
}

export type IBotContext = Context & ConversationFlavor & SessionFlavor<ISessionData>;

export type IBotConversation = Conversation<IBotContext>;
