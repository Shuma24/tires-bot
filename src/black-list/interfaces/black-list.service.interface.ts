import { IBlackList } from './black-list.interfaces';

export interface IBlackListService {
  addToBlackList(telegramID: number): Promise<IBlackList | undefined>;
  removeFromBlackList(dataBaseID: number): Promise<Boolean | undefined>;
  getAll(): Promise<IBlackList[] | undefined>;
}
