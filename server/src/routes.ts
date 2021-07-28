import { Router } from 'express';
import ClienteController from './controllers/ClienteController';

import EventoController from './controllers/EventoController';
import OrdemController from './controllers/OrdemController';
import SenhaController from './controllers/SenhaController';
import TokenController from './controllers/TokenController';

const routes = Router();

// CONTROLE

routes.post('/hashpasswords', SenhaController.hashPasswords);

routes.get('/evento', EventoController.index);
routes.get('/evento/:id', EventoController.show);
routes.post('/evento', EventoController.create);

routes.get('/senha', SenhaController.index);
routes.post('/senha', SenhaController.login);
routes.post('/senha/create', SenhaController.create);
routes.put('/senha/:id', SenhaController.switch);

routes.get('/token', TokenController.index);
routes.get('/token/:id', TokenController.show);
routes.post('/token', TokenController.create);

// APLICAÇÃO
// -- CLIENTE

routes.get('/client', ClienteController.index);
routes.get('/client/orders', ClienteController.showWithOrders);
routes.get('/client/:id', ClienteController.show);
routes.post('/client', ClienteController.create);
routes.put('/cliente/:id', ClienteController.edit);

// -- ORDEM

routes.get('/order', OrdemController.index);
routes.get('/order/:id', OrdemController.show);

routes.post('/opensales', OrdemController.showOpenSales);
routes.post('/insertedsales', OrdemController.showInsertedSales);
routes.post('/selectedpaymentsales', OrdemController.showSelectedPaymentSales);

routes.post('/order', OrdemController.create);
routes.put('/order/:id', OrdemController.edit);
routes.put('/order/condition/:id', OrdemController.editCondition);

routes.delete('/order/:id', OrdemController.delete);

export default routes;