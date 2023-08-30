import { IORMService } from '../dataBase/orm.interface';
import { IBlackList } from './interfaces/black-list.interfaces';
import { IBlackListRepository } from './interfaces/black-list.repository.interface';

export class BlackListRepository implements IBlackListRepository {
  constructor(private readonly _ormService: IORMService) {}

  async create(telegramID: number): Promise<IBlackList> {
    const newBannedUser = await this._ormService.client.blackList.create({
      data: {
        TelegramID: telegramID,
      },
    });

    return newBannedUser;
  }

  async delete(dataBaseID: number): Promise<Boolean> {
    const unbanedUser = await this._ormService.client.blackList.delete({
      where: {
        id: dataBaseID,
      },
    });

    if (!unbanedUser) return false;

    return true;
  }

  async getAll(): Promise<IBlackList[]> {
    return await this._ormService.client.blackList.findMany();
  }
}
