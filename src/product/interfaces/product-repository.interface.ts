import { IGetProductsBySize, ITires, ITiresImages, ITiresToCreate } from './product.interface';

export interface IProductRepository {
  create(data: ITiresToCreate): Promise<Omit<ITires, 'images'>>;
  createImage(url: string, tiresId: number): Promise<ITiresImages>;
  getBySize(size: string, skip?: number): Promise<IGetProductsBySize>;
  getById(id: number): Promise<ITires | null>;
  //update(data: ITires): Promise<any>;
  // delete(data: ITires): Promise<any>;
}
