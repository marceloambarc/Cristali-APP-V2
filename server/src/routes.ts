import { Router } from 'express';
import ClienteController from './controllers/ClienteController';

import EventoController from './controllers/EventoController';
import OrdemController from './controllers/OrdemController';
import SenhaController from './controllers/SenhaController';
import TokenController from './controllers/TokenController';

const routes = Router();


// ---------------------- CONTROLE

// -- CRIPTOGRAFAR SENHAS

routes.post('/hashpasswords', SenhaController.hashPasswords);

// -- LOGS

routes.get('/evento', EventoController.index);
routes.get('/evento/:id', EventoController.show);
routes.post('/evento', EventoController.create);

// -- USUÁRIOS

routes.get('/senha', SenhaController.index);
routes.get('/senha/:cgc', SenhaController.show);
routes.post('/login', SenhaController.login);
routes.post('/senha', SenhaController.create);
routes.put('/acesso/:id', SenhaController.switch);
routes.put('/senha/:cgc', SenhaController.edit);
routes.delete('/senha/:cgc', SenhaController.delete);

// -- TOKEN DE DISPOSITIVOS

routes.get('/token', TokenController.index);
routes.get('/token/:id', TokenController.show);
routes.post('/token', TokenController.create);


// ----------------------- APLICAÇÃO

// -- USUÁRIO 

routes.put('/changepassword', SenhaController.changePassword);

// -- CLIENTES

routes.get('/client', ClienteController.index);
routes.get('/client/orders', ClienteController.showWithOrders);
routes.get('/client/:id', ClienteController.show);
routes.post('/client', ClienteController.create);
routes.put('/cliente/:id', ClienteController.edit);

// -- ORDENS

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