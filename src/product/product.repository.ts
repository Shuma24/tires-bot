import { injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { IORMService } from '../dataBase/orm.interface';
import { IProductRepository } from './interfaces/product-repository.interface';
import {
  IGetProductsBySize,
  ITires,
  ITiresImages,
  ITiresToCreate,
} from './interfaces/product.interface';

export class ProductRepository implements IProductRepository {
  constructor(private readonly _orm: IORMService) {}

  async create(data: ITiresToCreate): Promise<Omit<ITires, 'images'>> {
    const product = await this._orm.client.tires.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        size: data.generatedSize,
        quantity: data.quantity,
        type: data.type,
      },
    });

    return product;
  }

  async createImage(url: string, tiresId: number): Promise<ITiresImages> {
    const images = await this._orm.client.images.create({
      data: {
        tiresId: tiresId,
        url: url,
      },
    });

    return images;
  }

  async getBySize(size: string, skip?: number): Promise<IGetProductsBySize> {
    const pageSize = 3;
    const skipPage = skip || 0;

    const products = await this._orm.client.tires.findMany({
      include: {
        images: true,
      },
      where: {
        size: size,
      },
      take: pageSize,
      skip: pageSize * skipPage,
    });

    const total = await this._orm.client.tires.count({
      where: {
        size: size,
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    const currentPage = skipPage > totalPages ? totalPages : skipPage;

    return {
      data: products,
      page: currentPage,
      total: total,
      lastPage: totalPages - 1,
    };
  }

  async getById(id: number): Promise<ITires | null> {
    const product = await this._orm.client.tires.findFirst({
      where: {
        id: id,
      },

      include: {
        images: true,
      },
    });

    return product;
  }
}

injected(ProductRepository, TOKENS.ormService);
