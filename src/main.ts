import { container } from './containter/containter';
import { TOKENS } from './containter/tokens';
import { clearOldSession } from './helpers/delete-session';

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

//delete old session
setInterval(clearOldSession, 60 * 1000);
