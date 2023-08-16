import { ITires } from './product.interface';

export interface IProductRepository {
  create(data: Omit<ITires, 'id' | 'images'>): Promise<Omit<ITires, 'images'>>;
  //update(data: ITires): Promise<any>;
  // delete(data: ITires): Promise<any>;
}
