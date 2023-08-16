import { PrismaClient } from '@prisma/client';

export interface IORMService {
  client: PrismaClient;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
