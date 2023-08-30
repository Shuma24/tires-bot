import { DependencyModule, injected } from 'brandi';
import { ProductService } from './product.service';
import { TOKENS } from '../containter/tokens';
import { ProductRepository } from './product.repository';

export const productModule = new DependencyModule();

//binds
productModule.bind(TOKENS.productService).toInstance(ProductService).inSingletonScope();
productModule.bind(TOKENS.productRepository).toInstance(ProductRepository).inSingletonScope();

// injected
injected(
  ProductService,
  TOKENS.productRepository,
  TOKENS.configService,
  TOKENS.fetchService,
  TOKENS.storage,
  TOKENS.loggerService,
);

injected(ProductRepository, TOKENS.ormService);
