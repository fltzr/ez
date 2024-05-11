import { Router } from 'express';
import { eventsController } from './courtreserve.controller';

export const courtReserveRoutes = Router();

courtReserveRoutes.get('/events', eventsController);
