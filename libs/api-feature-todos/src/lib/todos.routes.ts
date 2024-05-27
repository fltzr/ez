import { Router } from 'express';
import { getTodosController } from './todos.controller';

export const todosRoutes: Router = Router();

todosRoutes.get('/todos', getTodosController);
