import { container } from './containter/containter';
import { TOKENS } from './containter/tokens';

const main = () => {
  const app = container.get(TOKENS.app);

  app.init();
};

try {
  main();
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
