import { IAdmin } from './admin.interfaces';

export interface IAdminRepository {
  getAll(): Promise<IAdmin[]>;
}
