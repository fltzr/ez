import { courtReserveRoutes } from '@ez/courtreserve';
import { Router } from 'express';

export const routes = Router();

routes.use('/courtreserve', courtReserveRoutes);
