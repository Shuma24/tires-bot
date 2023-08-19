import {
  IGetProductsBySize,
  IPhotosIDTelegram,
  ITires,
  ITiresImages,
  ITiresToCreate,
} from './product.interface';

export interface IProductService {
  create(data: Omit<ITiresToCreate, 'generatedSize'>): Promise<Omit<ITires, 'images'> | undefined>;
  createImage(id: string, tiresID: number): Promise<ITiresImages | undefined>;
  getBySize(size: string, page?: number): Promise<IGetProductsBySize | undefined>;
  getById(id: number): Promise<ITires | undefined>;
  update(data: ITires): Promise<ITires | undefined>;
  delete(id: number): boolean;
}
