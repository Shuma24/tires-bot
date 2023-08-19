import { IGetProductsBySize, ITires, ITiresImages, ITiresToCreate } from './product.interface';

export interface IProductRepository {
  create(data: ITiresToCreate): Promise<Omit<ITires, 'images'>>;
  createImages(url: string, tiresId: number): Promise<ITiresImages>;
  getBySize(size: string, skip?: number): Promise<IGetProductsBySize>;
  //update(data: ITires): Promise<any>;
  // delete(data: ITires): Promise<any>;
}
