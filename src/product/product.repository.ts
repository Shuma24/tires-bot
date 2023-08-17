import { injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { IORMService } from '../dataBase/orm.interface';
import { IProductRepository } from './interfaces/product-repository.interface';
import { ITires, ITiresImages, ITiresToCreate } from './interfaces/product.interface';

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
}

injected(ProductRepository, TOKENS.ormService);
