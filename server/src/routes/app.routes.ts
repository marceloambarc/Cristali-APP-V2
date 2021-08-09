import { Router } from 'express';

import { clientAuth } from '../middleware/auth';

import ClienteController from '../controllers/ClienteController';
import OrdemController from '../controllers/OrdemController';
import SenhaController from '../controllers/SenhaController';
import OrdemPayController from '../controllers/OrdemPayController';

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

// - ORDEM DE PAGAMENTO
appRouter.post('/paymentOrder', OrdemPayController.create);

// - HISTÓRICO
appRouter.get('/myOrders/history/:id', OrdemController.userHystory);
appRouter.delete('/order', OrdemController.delete);

export default appRouter;