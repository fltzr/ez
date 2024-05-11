import express, { Application, json, urlencoded } from 'express';
import { env, logger, stream } from '@ez/core';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { routes } from './routes';
import morgan from 'morgan';

const useMiddleware = (app: Application) => {
  app.use(morgan('dev', { stream }));
  app.use(
    cors({
      origin: env.ORIGIN,
      credentials: env.CREDENTIALS,
    }),
  );

  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
};

const useRoutes = (app: Application) => {
  app.use('/', routes);
};

export const createApplication = async () => {
  const app = express();

  useMiddleware(app);
  useRoutes(app);

  logger.info('✅ Application initialized.');

  return app;
};
