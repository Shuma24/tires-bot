import { ITires } from '../interfaces/product.interface';

export class ProductEntity implements Omit<ITires, 'id' | 'images'> {
  radius: number;
  width: number;
  height: number;
  type: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  name: string;
  description: string;
  price: number;

  constructor(data: Omit<ITires, 'id' | 'images'>) {
    this.radius = data.radius;
    this.type = data.type;
    this.createdAt = data.createdAt;
    this.width = data.width;
    this.height = data.height;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
  }

  validateType(type: string) {
    if (type === 'summer' || type === 'winter' || type === 'allseason') {
      this.type = type;
    } else {
      this.type = 'summer';
    }

    return this;
  }
}
