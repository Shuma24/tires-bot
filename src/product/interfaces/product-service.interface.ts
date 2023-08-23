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
  ): Promise<ITires | undefined>;
  delete(id: number): Promise<boolean | undefined>;
}
