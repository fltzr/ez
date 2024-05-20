import { Router } from 'express';
import { getAccountInfoController } from './account.controller';

export const accountRoutes: Router = Router();

accountRoutes.get('/me', getAccountInfoController);
