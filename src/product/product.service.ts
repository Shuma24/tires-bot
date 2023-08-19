import { injected } from 'brandi';
import { IProductService } from './interfaces/product-service.interface';
import {
  IGetProductsBySize,
  IPhotosIDTelegram,
  ITires,
  ITiresImages,
  ITiresToCreate,
} from './interfaces/product.interface';
import { TOKENS } from '../containter/tokens';
import { ProductEntity } from './entity/product.entity';
import { IProductRepository } from './interfaces/product-repository.interface';
import { IConfigService } from '../common/interfaces/config.service.interface';
import { IFetchService } from '../fetch/interfaces/fetch.interface';
import { IResTGPath } from './interfaces/response.interface';
import { IStorage } from '../storage/interfaces/storage.interfaces';
import { ILoggerService } from '../common/interfaces/logger.service.interface';

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

  async createImage(
    listOfIds: IPhotosIDTelegram[],
    tiresID: number,
  ): Promise<ITiresImages[] | undefined> {
    try {
      const token = this._configService.get('BOT_SECRET');

      let arrWithPath: string[] = [];

      let linksToPhoto: string[] = [];

      let listOfImages: ITiresImages[] = [];

      if (!token) {
        this._loggerService.error('Problems with get token from .env');
        throw new Error('Problems with get token from .env');
      }

      for (let i = 0; i < listOfIds.length; i++) {
        const pathFileLink = `https://api.telegram.org/bot${token}/getFile?file_id=${listOfIds[i].id}`;

        const { data } = await this._fetchService.GET<IResTGPath>(pathFileLink);

        if (!data) return;

        arrWithPath = [...arrWithPath, data.result.file_path];
      }

      if (!arrWithPath.length) throw new Error('No path to download image from telegram');

      for (let i = 0; i < arrWithPath.length; i++) {
        const pathToDownload = `https://api.telegram.org/file/bot${token}/${arrWithPath[i]}`;

        const { data } = await this._fetchService.GET<Buffer>(pathToDownload, {
          responseType: 'arraybuffer',
        });

        const uploadedPhoto = await this._storageService.handleFile({
          data: data,
          filename: 'tires-bot',
          encoding: 'utf8',
          mimetype: 'image/jpeg',
          limit: false,
        });

        if (!uploadedPhoto) return;

        linksToPhoto = [...linksToPhoto, uploadedPhoto.url];
      }

      for (let i = 0; i < linksToPhoto.length; i++) {
        const image = await this._productRepository.createImages(linksToPhoto[i], tiresID);

        listOfImages = [...listOfImages, image];
      }

      return listOfImages;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(data: ITires): Promise<ITires | undefined> {
    if (!data) return undefined;

    return data;
  }
  delete(id: number): boolean {
    const test = Boolean(id);
    return test;
  }

  async getBySize(size: string, page?: number): Promise<IGetProductsBySize | undefined> {
    try {
      if (!size) {
        this._loggerService.error('No size');
        throw new Error('Size is required.');
      }

      const products = await this._productRepository.getBySize(size, page);

      return products;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}

injected(
  ProductService,
  TOKENS.productRepository,
  TOKENS.configService,
  TOKENS.fetchService,
  TOKENS.storage,
  TOKENS.loggerService,
);
