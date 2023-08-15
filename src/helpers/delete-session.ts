import fs from 'fs';
import { ISessionData } from '../tg-bot/interface/bot-context.interface';

interface ISessionBody {
  id: string;
  data: ISessionData;
}

interface ISessionFile {
  sessions: ISessionBody[];
}

export const clearOldSession = () => {
  const sessionData: ISessionFile = JSON.parse(fs.readFileSync('../session_db.json', 'utf-8'));
  const expirationTime: number = 1 * 60 * 1000;
  const now: number = new Date().getTime();

  for (let i = 0; i < sessionData.sessions.length; i++) {
    const session = sessionData.sessions[i];
    const lastActivity = session.data.lastActivity;

    if (now - Number(lastActivity) > expirationTime) {
      delete sessionData.sessions[i];
    }
  }

  fs.writeFileSync('../session_db.json', JSON.stringify(sessionData));
};
