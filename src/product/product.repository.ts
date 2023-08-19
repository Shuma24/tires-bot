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

  async createImages(url: string, tiresId: number): Promise<ITiresImages> {
    const images = await this._orm.client.images.create({
      data: {
        tiresId: tiresId,
        url: url,
      },
    });

    return images;
  }

  async getBySize(size: string, skip?: number): Promise<IGetProductsBySize> {
    const products = await this._orm.client.tires.findMany({
      include: {
        images: true,
      },
      where: {
        size: size,
      },
      take: 3,
      skip: skip ? skip : 0,
    });

    const total = await this._orm.client.tires.count({
      where: {
        size: size,
      },
    });

    return {
      data: products,
      page: skip ? skip : 0,
      total: total,
      lastPage: Math.ceil(total / 3) - 1,
    };
  }
}

injected(ProductRepository, TOKENS.ormService);
