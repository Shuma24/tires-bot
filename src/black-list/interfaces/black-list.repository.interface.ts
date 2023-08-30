import { IBlackList } from './black-list.interfaces';

export interface IBlackListRepository {
  create(telegramID: number): Promise<IBlackList>;
  delete(dataBaseID: number): Promise<Boolean>;
  getAll(): Promise<IBlackList[]>;
}
