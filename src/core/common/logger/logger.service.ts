import winston from 'winston';

import { ILoggerService } from '../interfaces/logger.service.interface';

export class LoggerService implements ILoggerService {
  private readonly Logger: winston.Logger;

  constructor() {
    this.Logger = winston.createLogger({
      transports: [
        new winston.transports.Console({ format: winston.format.colorize({ all: true }) }),
      ],
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.label({
          label: '[LOGGER]',
        }),
        winston.format.timestamp({
          format: 'YY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
          (info) => `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
        ),
      ),
    });
  }

  info(message: string): void {
    this.Logger.log('info', message);
  }

  error(message: string): void {
    this.Logger.log('error', message);
  }

  warn(message: string): void {
    this.Logger.log('warn', message);
  }
}
