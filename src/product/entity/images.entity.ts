import { ITiresImages } from '../interfaces/product.interface';

export class ImagesEntity implements Omit<ITiresImages, 'id' | 'createdAt' | 'updatedAt'> {
  tiresId: number | null;
  url: string;

  constructor(data: Omit<ITiresImages, 'id' | 'createdAt' | 'updatedAt'>) {
    this.tiresId = data.tiresId;
    this.url = data.url;
  }
}
