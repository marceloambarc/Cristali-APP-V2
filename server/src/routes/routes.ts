import { Router } from 'express';

import appRouter from './app.routes';
import controllerRouter from './controller.routes';

const routes = Router();

routes.use(appRouter);
routes.use(controllerRouter);

export default routes;