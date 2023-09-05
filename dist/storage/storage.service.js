"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Storage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const name_photo_generator_1 = require("./helpers/name-photo-generator");
class S3Storage {
    constructor(_configService, _loggerService) {
        this._configService = _configService;
        this._loggerService = _loggerService;
        this.bucketName = _configService.get('AWS_PUBLIC_BUCKET_NAME');
        this.region = _configService.get('AWS_REGION');
        this.s3Client = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                accessKeyId: _configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: _configService.get('AWS_SECRET_ACCESS_KEY'),
            },
        });
        this._loggerService.info('S3Storage initialized');
    }
    handleFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = null;
            const randomName = (0, name_photo_generator_1.RandomNameGenerator)({ length: 10 });
            const params = {
                Bucket: this.bucketName,
                Key: `${randomName}-${file.filename}`,
                Body: file.data,
                ContentType: file.mimetype,
            };
            try {
                const upload = new lib_storage_1.Upload({
                    client: this.s3Client,
                    params,
                });
                const data = yield upload.done();
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
                }
                else {
                    throw new Error('S3 Upload Error');
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
    deleteFile(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: this._configService.get('AWS_PUBLIC_BUCKET_NAME'),
                    Key: key,
                });
                yield this.s3Client.send(command);
                return true;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.S3Storage = S3Storage;
