import { ILoggerService } from '../core/common/interfaces/logger.service.interface';
import { IBlackList } from './interfaces/black-list.interfaces';
import { IBlackListRepository } from './interfaces/black-list.repository.interface';
import { IBlackListService } from './interfaces/black-list.service.interface';

export class BlackListService implements IBlackListService {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _blackListRepository: IBlackListRepository,
  ) {
    this._loggerService.info('Black list service initialized');
  }

  async addToBlackList(telegramID: number): Promise<IBlackList | undefined> {
    try {
      const bannedUser = await this._blackListRepository.create(telegramID);

      return bannedUser;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async removeFromBlackList(dataBaseID: number): Promise<Boolean | undefined> {
    try {
      const removed = await this._blackListRepository.delete(dataBaseID);

      return removed;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async getAll(): Promise<IBlackList[] | undefined> {
    try {
      const listOfBannedUsers = await this._blackListRepository.getAll();

      return listOfBannedUsers;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}
