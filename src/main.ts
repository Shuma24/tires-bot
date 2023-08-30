import { wrapper } from './containter/wrapper';
import { TOKENS } from './containter/tokens';

const main = () => {
  const app = wrapper.get(TOKENS.app);

  app.init();
};

main();
