import { Router } from 'express';

import appRouter from './app.routes';
import controllerRouter from './controller.routes';
// import psController from './ps.routes';

const routes = Router();

routes.use(appRouter);
routes.use(controllerRouter);
// routes.use(psController);

export default routes;