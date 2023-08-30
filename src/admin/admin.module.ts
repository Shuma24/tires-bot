import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';

export const adminModule = new DependencyModule();

adminModule.bind(TOKENS.adminService).toInstance(AdminService).inSingletonScope();
adminModule.bind(TOKENS.adminRepository).toInstance(AdminRepository).inSingletonScope();

injected(AdminService, TOKENS.loggerService, TOKENS.adminRepository);
injected(AdminRepository, TOKENS.ormService);
