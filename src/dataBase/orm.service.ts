import { PrismaClient } from '@prisma/client';

import { IORMService } from './orm.interface';
import { ILoggerService } from '../core/common/interfaces/logger.service.interface';

export class ORMService implements IORMService {
  public client: PrismaClient;

  constructor(private readonly _loggerService: ILoggerService) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this._loggerService.info('Prisma connected to DB.');
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.$disconnect();
      this._loggerService.info('Prisma disconnected.');
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
      }
    }
  }
}
