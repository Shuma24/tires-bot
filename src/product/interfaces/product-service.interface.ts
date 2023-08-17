import { IPhotosIDTelegram, ITires, ITiresImages, ITiresToCreate } from './product.interface';

export interface IProductService {
  create(data: Omit<ITiresToCreate, 'generatedSize'>): Promise<Omit<ITires, 'images'> | undefined>;
  createImage(listOfIds: IPhotosIDTelegram[], tiresID: number): Promise<ITiresImages[] | undefined>;
  update(data: ITires): Promise<ITires | undefined>;
  delete(id: number): boolean;
}
