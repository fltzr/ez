import { courtReserveRoutes } from '@ez/courtreserve';
import { NextFunction, Request, Response, Router } from 'express';

export const routes = Router();

routes.use('/courtreserve', courtReserveRoutes);
