import { ITires } from './product.interface';

export interface IProductService {
  create(
    data: Omit<ITires, 'id' | 'images' | 'createdAt' | 'updatedAt'>,
  ): Promise<Omit<ITires, 'images'> | undefined>;
  createImage(listOfIds: { id: string }[], tiresID: number): Promise<void>;
  update(data: ITires): Promise<ITires | undefined>;
  delete(id: number): boolean;
}
