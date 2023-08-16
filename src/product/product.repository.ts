import { injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { IORMService } from '../dataBase/orm.interface';
import { IProductRepository } from './interfaces/product-respository.interface';
import { ITires } from './interfaces/product.interface';

export class ProductRepository implements IProductRepository {
  constructor(private readonly _orm: IORMService) {}

  async create(data: ITires): Promise<Omit<ITires, 'images'>> {
    const instance = await this._orm.client.tires.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        width: data.width,
        height: data.height,
        radius: data.radius,
        type: data.type,
      },
    });

    return instance;
  }
}

injected(ProductRepository, TOKENS.ormService);
