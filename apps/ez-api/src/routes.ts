import { courtReserveRoutes } from '@ez/courtreserve';
import { Request, Response, Router } from 'express';

export const routes = Router();

routes.get('/', (_request: Request, response: Response) => response.send('Hello, World!'));
routes.use('/courtreserve', courtReserveRoutes);
