import { IORMService } from '../dataBase/orm.interface';
import { IAdminRepository } from './interfaces/admin-repository.interface';
import { IAdmin } from './interfaces/admin.interfaces';

export class AdminRepository implements IAdminRepository {
  constructor(private readonly _ormService: IORMService) {}

  async getAll(): Promise<IAdmin[]> {
    const listOfAdmins = await this._ormService.client.admins.findMany();

    return listOfAdmins;
  }
}
