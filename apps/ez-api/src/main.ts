import { env, logger } from '@ez/core';
import { createApplication } from './app';

const startServer = async () => {
  try {
    const app = await createApplication();

    app.listen(env.PORT, () => {
      logger.info(`🚀 Server listening @ port ${env.PORT}.`);
    });
  } catch (error) {
    logger.error(`❌ Error starting server: ${error}`);
  }
};

startServer();
