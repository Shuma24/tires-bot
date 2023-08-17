import { ITiresToCreate } from '../interfaces/product.interface';

export class ProductEntity implements ITiresToCreate {
  radius: number;
  width: number;
  height: number;
  type: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  generatedSize: string;

  constructor(data: ITiresToCreate) {
    this.radius = data.radius;
    this.width = data.width;
    this.height = data.height;
    this.type = data.type;
    this.generatedSize = data.generatedSize;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
  }

  validateType(type: string) {
    if (type === 'summer' || type === 'winter' || type === 'allseason') {
      this.type = type;
    } else {
      this.type = 'summer';
    }

    return this;
  }

  createSize(width: number, height: number, radius: number) {
    this.generatedSize = `${width}/${height}/${radius}`;

    return this;
  }
}
