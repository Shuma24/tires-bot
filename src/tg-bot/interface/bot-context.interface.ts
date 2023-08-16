import { Context, SessionFlavor } from 'grammy';

interface IImages {
  id: string;
}

export interface ISessionData {
  type: string;
  radius: number;
  width: number;
  height: number;
  name: string;
  description: string;
  price: number;
  images: IImages[];
}

export type IBotContext = Context & SessionFlavor<ISessionData>;
