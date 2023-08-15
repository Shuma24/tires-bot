import { Context } from 'telegraf';

export interface ISessionData {
  type: string;
  radius: number;
  width: number;
  height: number;
  lastActivity: string;
}

export interface IBotContext extends Context {
  session: ISessionData;
}
