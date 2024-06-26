import { IProductService } from './interfaces/product-service.interface';
import {
  IGetProductsBySize,
  ITires,
  ITiresImages,
  ITiresToCreate,
} from './interfaces/product.interface';

import { ProductEntity } from './entity/product.entity';
import { IProductRepository } from './interfaces/product-repository.interface';

import { IResTGPath } from './interfaces/response.interface';
import { IStorage } from '../storage/interfaces/storage.interfaces';
import { IConfigService } from '../core/common/interfaces/config.service.interface';
import { IFetchService } from '../core/common/fetch/interfaces/fetch.interface';
import { ILoggerService } from '../core/common/interfaces/logger.service.interface';

export class ProductService implements IProductService {
  constructor(
    private readonly _productRepository: IProductRepository,
    private readonly _configService: IConfigService,
    private readonly _fetchService: IFetchService,
    private readonly _storageService: IStorage,
    private readonly _loggerService: ILoggerService,
  ) {
    this._loggerService.info('ProductService initialized');
  }

  async create(
    data: Omit<ITiresToCreate, 'generatedSize'>,
  ): Promise<Omit<ITires, 'images'> | undefined> {
    try {
      if (!data) {
        this._loggerService.error('No data');
        throw new Error('No data');
      }

      const newTires = new ProductEntity({
        name: data.name,
        price: data.price,
        type: '',
        width: data.width,
        radius: data.radius,
        description: data.description,
        height: data.height,
        generatedSize: '',
        quantity: data.quantity,
      })
        .validateType(data.type)
        .createSize(data.width, data.height, data.radius);

      const createdTire = await this._productRepository.create(newTires);

      if (!createdTire) {
        this._loggerService.error('Problems with create product');
        throw new Error('Problems with create product');
      }

      return createdTire;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async createImage(id: string, tiresID: number): Promise<ITiresImages | undefined> {
    try {
      const token = this._configService.get('BOT_SECRET');

      const isTires = await this.getById(tiresID);

      if (!isTires?.id || isTires.id !== tiresID) return;

      if (!token) {
        this._loggerService.error('Problems with get token from .env');
        throw new Error('Problems with get token from .env');
      }

      const responseWithPath = await this._fetchService.GET<IResTGPath>(
        `https://api.telegram.org/bot${token}/getFile?file_id=${id}`,
      );

      if (!responseWithPath.data.result.file_path) {
        this._loggerService.error('No path to download image');
        throw new Error('No path to download image');
      }

      const responseWithBuffer = await this._fetchService.GET<Buffer>(
        `https://api.telegram.org/file/bot${token}/${responseWithPath.data.result.file_path}`,
        {
          responseType: 'arraybuffer',
        },
      );

      if (!responseWithBuffer.data) {
        this._loggerService.error('No buffer from telegram');
        throw new Error('No buffer from telegram');
      }

      const uploadedPhoto = await this._storageService.handleFile({
        data: responseWithBuffer.data,
        filename: 'tires-bot',
        encoding: 'utf8',
        mimetype: 'image/jpeg',
        limit: false,
      });

      if (!uploadedPhoto) {
        this._loggerService.error('Problem with upload to cloud');
        throw new Error('Problem with upload to cloud');
      }

      const image = await this._productRepository.createImage(uploadedPhoto.url, tiresID);

      return image;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(
    data: {
      name?: string;
      description?: string;
      price?: number;
      size?: string;
      quantity?: number;
      type?: string;
    },
    productID: number,
  ): Promise<ITires | undefined> {
    try {
      const isCorrectID = await this.getById(productID);

      if (!isCorrectID) {
        this._loggerService.error('Incorrect product ID');
        throw new Error('Incorrect product ID');
      }

      const updatedProduct = await this._productRepository.update({ ...data }, productID);

      return updatedProduct;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
  async delete(id: number): Promise<boolean | undefined> {
    try {
      const product = await this.getById(id);

      if (!product) {
        this._loggerService.error('Incorrect id');
        throw new Error('Incorrect id');
      }

      if (product.images) {
        for (let i = 0; i < product.images.length; i++) {
          const baseURL = 'https://tiresbotbucket.s3.eu-central-1.amazonaws.com/';

          const key = decodeURIComponent(product.images[i].url.replace(baseURL, ''));

          await this._storageService.deleteFile(key);
        }
      }

      const delResult = await this._productRepository.delete(id);

      return delResult;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async getForCustomer(
    size: string,
    type: string,
    page?: number,
  ): Promise<IGetProductsBySize | undefined> {
    try {
      if (!size) {
        this._loggerService.error('No size');
        throw new Error('Size is required.');
      }

      const products = await this._productRepository.getForCustomer(size, type, page);

      return products;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id: number): Promise<ITires | undefined> {
    try {
      if (!id) {
        this._loggerService.error('No id');
        return;
      }

      const product = await this._productRepository.getById(id);

      if (!product) {
        this._loggerService.error('Bad ID or another problem');
        return;
      }

      return product;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async getByFields(
    data: {
      name?: string | undefined;
      description?: string | undefined;
      price?: number | undefined;
      size?: string | undefined;
      quantity?: number | undefined;
      type?: string | undefined;
    },
    page: number,
  ) {
    try {
      const findProduct = await this._productRepository.getByFields({ ...data }, page);

      if (!findProduct) {
        this._loggerService.error('No product or problem');
        throw new Error('No product or problem');
      }

      return findProduct;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}
