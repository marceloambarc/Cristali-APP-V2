import { Router } from 'express';

import { clientAuth, adminAuth } from './middleware/auth';

import ClienteController from './controllers/ClienteController';
import EventoController from './controllers/EventoController';
import OrdemController from './controllers/OrdemController';
import SenhaController from './controllers/SenhaController';
import TokenController from './controllers/TokenController';

const routes = Router();


// ---------------------- CONTROLE

// -- CRIPTOGRAFAR SENHAS

/* 
  CASO A CREDENCIAL JWTSECRET FOR ALTERADA APÓS A APLICAÇÃO ESTAR EM
  PRODUÇÃO, ENVIAR UMA REQUISIÇÃO DO TIPO POST COM O CORPO EM JSON
  COM A VARIÁVEL "PASSWORD" COM O PARÂMETRO SEGUNDA SENHA.
*/
routes.post('/hashpasswords', adminAuth, SenhaController.hashPasswords);

// -- LOGS

routes.get('/evento', adminAuth, EventoController.index);
routes.get('/evento/:id', adminAuth, EventoController.show);
routes.post('/evento', clientAuth, EventoController.create);

// -- USUÁRIOS

routes.get('/senha', adminAuth, SenhaController.index);
routes.get('/senha/:cgc', adminAuth, SenhaController.show);
routes.post('/login', SenhaController.login);
routes.post('/senha', adminAuth, SenhaController.create);
routes.put('/acesso/:id', adminAuth, SenhaController.switch);
routes.put('/senha/:cgc', adminAuth, SenhaController.edit);
routes.delete('/senha/:cgc', adminAuth, SenhaController.delete);

// -- TOKEN DE DISPOSITIVOS

routes.get('/token', adminAuth, TokenController.index);
routes.post('/token/:id', adminAuth, TokenController.show);
routes.post('/token', clientAuth, TokenController.create);

// -- TODAS AS CLIENTES FINAIS

routes.get('/client', adminAuth, ClienteController.index);
routes.get('/client/orders', adminAuth, ClienteController.showWithOrders);
routes.get('/client/:id', adminAuth, ClienteController.show);
routes.post('/client', adminAuth, ClienteController.create);
routes.put('/cliente/:id', adminAuth, ClienteController.edit);

// -- TODAS AS ORDENS

routes.get('/order', adminAuth, OrdemController.index);
routes.get('/order/:id', adminAuth, OrdemController.show);

routes.post('/opensales', adminAuth, OrdemController.showOpenSales);
routes.post('/insertedsales', adminAuth, OrdemController.showInsertedSales);
routes.post('/selectedpaymentsales', adminAuth, OrdemController.showSelectedPaymentSales);

routes.post('/order', adminAuth, OrdemController.create);
routes.put('/order/:id', adminAuth, OrdemController.edit);
routes.put('/order/condition/:id', adminAuth, OrdemController.editCondition);

routes.delete('/order/:id', adminAuth, OrdemController.delete);

// ----------------------- APLICAÇÃO

// -- USUÁRIO 

routes.put('/changepassword', clientAuth, SenhaController.changePassword);

// -- CLIENTES



// -- ORDENS



export default routes;