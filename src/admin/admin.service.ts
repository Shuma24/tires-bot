import { ILoggerService } from '../core/common/interfaces/logger.service.interface';
import { IAdminRepository } from './interfaces/admin-repository.interface';
import { IAdminService } from './interfaces/admin-service.interface';
import { IAdmin } from './interfaces/admin.interfaces';

export class AdminService implements IAdminService {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _adminRepository: IAdminRepository,
  ) {
    this._loggerService.info('Admin service is initialized');
  }

  async getAll(): Promise<IAdmin[] | undefined> {
    try {
      const listOfAdmins = await this._adminRepository.getAll();

      return listOfAdmins;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}
