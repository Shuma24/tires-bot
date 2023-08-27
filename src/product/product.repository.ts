import { injected } from 'brandi';
import { TOKENS } from '../containter/tokens';
import { IORMService } from '../dataBase/orm.interface';
import { IProductRepository } from './interfaces/product-repository.interface';
import {
  IGetProductsBySize,
  ITires,
  ITiresImages,
  ITiresToCreate,
} from './interfaces/product.interface';

export class ProductRepository implements IProductRepository {
  constructor(private readonly _orm: IORMService) {}

  async create(data: ITiresToCreate): Promise<Omit<ITires, 'images'>> {
    const product = await this._orm.client.tires.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        size: data.generatedSize,
        quantity: data.quantity,
        type: data.type,
      },
    });

    return product;
  }

  async createImage(url: string, tiresId: number): Promise<ITiresImages> {
    const images = await this._orm.client.images.create({
      data: {
        tiresId: tiresId,
        url: url,
      },
    });

    return images;
  }

  async getBySize(size: string, skip?: number): Promise<IGetProductsBySize> {
    const pageSize = 3;
    const skipPage = skip || 0;

    const products = await this._orm.client.tires.findMany({
      include: {
        images: true,
      },
      where: {
        size: size,
      },
      take: pageSize,
      skip: pageSize * skipPage,
    });

    const total = await this._orm.client.tires.count({
      where: {
        size: size,
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    const currentPage = skipPage > totalPages ? totalPages : skipPage;

    return {
      data: products,
      page: currentPage,
      total: total,
      lastPage: totalPages - 1,
    };
  }

  async getById(id: number): Promise<ITires | null> {
    const product = await this._orm.client.tires.findFirst({
      where: {
        id: id,
      },

      include: {
        images: true,
      },
    });

    return product;
  }

  async delete(id: number): Promise<boolean> {
    const del = await this._orm.client.tires.delete({
      where: {
        id: id,
      },
    });

    return del.id ? true : false;
  }

  async update(
    data: {
      name?: string | undefined;
      description?: string | undefined;
      price?: number | undefined;
      size?: string | undefined;
      quantity?: number | undefined;
      type?: string | undefined;
    },
    productID: number,
  ): Promise<ITires> {
    const updatedProduct = await this._orm.client.tires.update({
      where: {
        id: productID,
      },
      data: {
        ...data,
      },
    });

    return updatedProduct;
  }

  async getByFields(
    data: {
      name?: string | undefined;
      description?: string | undefined;
      price?: number | undefined;
      size?: string | undefined;
      quantity?: number | undefined;
      type?: string | undefined;
    },
    skip?: number,
  ): Promise<IGetProductsBySize | null> {
    const pageSize = 3;
    const skipPage = skip || 0;

    const products = await this._orm.client.tires.findMany({
      where: { ...data },
      include: {
        images: true,
      },
      skip: skip,
      take: pageSize,
    });

    const total = await this._orm.client.tires.count({
      where: {
        ...data,
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    const currentPage = skipPage > totalPages ? totalPages : skipPage;

    return {
      data: products,
      page: currentPage,
      total: total,
      lastPage: totalPages - 1,
    };
  }
}

injected(ProductRepository, TOKENS.ormService);
