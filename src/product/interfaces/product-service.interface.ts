import { ITires } from './product.interface';

export interface IProductService {
  create(data: ITires): Promise<Omit<ITires, 'images'> | undefined>;
  update(data: ITires): Promise<ITires | undefined>;
  delete(id: number): boolean;
}
