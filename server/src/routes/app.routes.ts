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
appRouter.post('/order', OrdemController.create);
appRouter.put('/order/:id', OrdemController.edit);
appRouter.put('/order/condition/:id', OrdemController.editCondition);

// - ORDENS SALVAS
appRouter.get('/myOrders/saved/:id', OrdemController.userSavedOrders);

// - HISTÓRICO
appRouter.get('/myOrders/history/all/:id', OrdemController.userHystory);
appRouter.get('/myOrders/history/paid/:id', OrdemController.historyPaid);
appRouter.get('/myOrders/history/notPaid/:id', OrdemController.historyNotPaid);
appRouter.delete('/order', OrdemController.delete);

export default appRouter;