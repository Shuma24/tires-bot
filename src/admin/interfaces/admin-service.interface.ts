import { IAdmin } from './admin.interfaces';

export interface IAdminService {
  getAll(): Promise<IAdmin[] | undefined>;
}
