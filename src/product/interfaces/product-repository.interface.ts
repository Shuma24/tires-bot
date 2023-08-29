import { IGetProductsBySize, ITires, ITiresImages, ITiresToCreate } from './product.interface';

export interface IProductRepository {
  create(data: ITiresToCreate): Promise<Omit<ITires, 'images'>>;
  createImage(url: string, tiresId: number): Promise<ITiresImages>;
  getForCustomer(size: string, type: string, skip?: number): Promise<IGetProductsBySize>;
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
  getByFields(
    data: {
      name?: string | undefined;
      description?: string | undefined;
      price?: number | undefined;
      size?: string | undefined;
      quantity?: number | undefined;
      type?: string | undefined;
    },
    skip?: number,
  ): Promise<IGetProductsBySize | null>;
}
