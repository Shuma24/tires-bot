import { injected } from 'brandi';
import { IProductService } from './interfaces/product-service.interface';
import { ITires } from './interfaces/product.interface';
import { TOKENS } from '../containter/tokens';
import { ProductEntity } from './entity/product.entity';
import { IProductRepository } from './interfaces/product-repository.interface';

export class ProductService implements IProductService {
  constructor(private readonly _productRepository: IProductRepository) {}

  async create(
    data: Omit<ITires, 'id' | 'images' | 'createdAt' | 'updatedAt'>,
  ): Promise<Omit<ITires, 'images'> | undefined> {
    try {
      if (!data) throw new Error('No ');

      const newTires = new ProductEntity({
        name: data.name,
        price: data.price,
        type: '',
        width: data.width,
        radius: data.radius,
        createdAt: new Date(Date.now()),
        updatedAt: null,
        description: data.description,
        height: data.height,
      }).validateType(data.type);

      const createdTire = await this._productRepository.create(newTires);

      if (!createdTire) throw new Error('Problems with create product');

      return createdTire;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async createImage(listOfIds: { id: string }[], tiresID: number) {
    try {
      console.log(listOfIds, tiresID);
    } catch (error) {
      if (error instanceof Error) {
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
}

injected(ProductService, TOKENS.productRepository);
