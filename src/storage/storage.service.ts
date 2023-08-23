import {
  CompleteMultipartUploadCommandOutput,
  PutObjectCommandInput,
  S3Client,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

import { IStorage, IUploadResponse, inputFiles } from './interfaces/storage.interfaces';
import { IConfigService } from '../common/interfaces/config.service.interface';
import { ILoggerService } from '../common/interfaces/logger.service.interface';
import { RandomNameGenerator } from './helpers/name-photo-generator';
import { injected } from 'brandi';
import { TOKENS } from '../containter/tokens';

export class S3Storage implements IStorage {
  private readonly bucketName: string;
  private readonly region: string;
  private readonly s3Client: S3Client;

  constructor(
    private readonly _configService: IConfigService,
    private readonly _loggerService: ILoggerService,
  ) {
    this.bucketName = _configService.get('AWS_PUBLIC_BUCKET_NAME');
    this.region = _configService.get('AWS_REGION');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: _configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: _configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this._loggerService.info('S3Storage initialized');
  }

  async handleFile(file: inputFiles): Promise<IUploadResponse | undefined> {
    let result = null;

    const randomName = RandomNameGenerator({ length: 10 });

    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: `${randomName}-${file.filename}`,
      Body: file.data,
      ContentType: file.mimetype,
    };

    try {
      const upload = new Upload({
        client: this.s3Client,
        params,
      });

      const data: CompleteMultipartUploadCommandOutput = await upload.done();

      if (!data) {
        throw new Error('S3 Upload Error');
      }

      if (data.$metadata.httpStatusCode !== 200) {
        throw new Error('S3 Upload Error');
      }

      if (data.Bucket && data.Key && data.Location) {
        result = {
          url: data.Location,
          filename: data.Key,
        };

        return result;
      } else {
        throw new Error('S3 Upload Error');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this._configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      });

      await this.s3Client.send(command);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

injected(S3Storage, TOKENS.configService, TOKENS.loggerService);
