import { DotenvParseOutput, config } from 'dotenv';

import { IConfigService } from '../interfaces/config.service.interface';
import { ILoggerService } from '../interfaces/logger.service.interface';
import { injected } from 'brandi';
import { TOKENS } from '../../containter/tokens';

export class ConfigService implements IConfigService {
  config: DotenvParseOutput;

  constructor(private readonly _loggerService: ILoggerService) {
    const { error, parsed } = config();
    if (error) throw new Error('.env is required.');

    if (!parsed) throw new Error('.env is empty');

    this.config = parsed;

    this._loggerService.info('ConfigService is initialized and working.');
  }
  get(key: string): string {
    const result = this.config[key];
    if (!result) throw new Error('ENV Key is required.');

    return result;
  }
}

injected(ConfigService, TOKENS.loggerService);
