import { IGetProductsBySize, ITires, ITiresImages, ITiresToCreate } from './product.interface';

export interface IProductRepository {
  create(data: ITiresToCreate): Promise<Omit<ITires, 'images'>>;
  createImage(url: string, tiresId: number): Promise<ITiresImages>;
  getBySize(size: string, skip?: number): Promise<IGetProductsBySize>;
  getById(id: number): Promise<ITires | null>;
  delete(id: number): Promise<boolean>;
  update(
    data: {
      name?: string;
      description?: string;
      price?: number;
      size?: string;
      quantity?: number;
      type?: string;
    },
    productID: number,
  ): Promise<ITires>;
}
