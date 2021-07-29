import { Router } from 'express';

import { clientAuth } from '../middleware/auth';

import ClienteController from '../controllers/ClienteController';
import OrdemController from '../controllers/OrdemController';
import SenhaController from '../controllers/SenhaController';

const appRouter = Router();

// ----------------------- APLICAÇÃO

// ------------------------ USUÁRIO 

appRouter.post('/login', SenhaController.login);
appRouter.put('/changepassword', clientAuth, SenhaController.changePassword);

// ------------------------ CLIENTES

appRouter.get('/myClients/:id', ClienteController.userClients);

// ------------------------- ORDENS

// - TODAS AS ORDENS
appRouter.get('/myOrders/:id', OrdemController.userOrders);
appRouter.put('/order/condition/:id', clientAuth, OrdemController.editCondition);

// - ORDENS SALVAS
appRouter.get('/mySavedOrders/:id', OrdemController.userSavedOrders);

// - HISTÓRICO
appRouter.get('/myOrders/history/:id', OrdemController.userHystory);
appRouter.delete('/myOrders/history/:id', OrdemController.deleteUserHistory);

export default appRouter;