import { Router } from 'express';

import { clientAuth } from '../middleware/auth';

import ClienteController from '../controllers/ClienteController';
import EventoController from '../controllers/EventoController';
import OrdemController from '../controllers/OrdemController';
import SenhaController from '../controllers/SenhaController';
import TokenController from '../controllers/TokenController';

const controllerRouter = Router();

// ---------------------- CONTROLE

// -- CRIPTOGRAFAR SENHAS

/* 
  CASO A CREDENCIAL JWTSECRET FOR ALTERADA APÓS A APLICAÇÃO ESTAR EM
  PRODUÇÃO, ENVIAR UMA REQUISIÇÃO DO TIPO POST COM O CORPO EM JSON
  COM A VARIÁVEL "PASSWORD" COM O PARÂMETRO DA "SEGUNDASENHA".
*/
controllerRouter.post('/hashpasswords', clientAuth, SenhaController.hashPasswords);

// -- LOGS

controllerRouter.get('/evento', clientAuth, EventoController.index);
controllerRouter.get('/evento/:id', clientAuth, EventoController.show);
controllerRouter.post('/evento', clientAuth, EventoController.create);

// -- TODOS USUÁRIOS

controllerRouter.get('/senha', clientAuth, SenhaController.index);
controllerRouter.get('/senha/:cgc', clientAuth, SenhaController.show);
controllerRouter.post('/senha', SenhaController.create);
controllerRouter.put('/acesso', clientAuth, SenhaController.switch);
controllerRouter.put('/senha/:cgc', clientAuth, SenhaController.edit);
controllerRouter.delete('/senha/:cgc', clientAuth, SenhaController.delete);
controllerRouter.post('/resetpassword', SenhaController.resetPassword);

// -- TOKEN DE DISPOSITIVOS

controllerRouter.get('/token', clientAuth, TokenController.index);
controllerRouter.post('/token/:id', clientAuth, TokenController.show);
controllerRouter.post('/token', TokenController.create);

// -- TODOS OS CLIENTES FINAIS

controllerRouter.get('/client', clientAuth, ClienteController.index);
controllerRouter.get('/client/orders', clientAuth, ClienteController.showWithOrders);
controllerRouter.get('/client/:id', clientAuth, ClienteController.show);
controllerRouter.post('/client', clientAuth, ClienteController.create);
controllerRouter.put('/cliente/:id', clientAuth, ClienteController.edit);

// -- TODAS AS ORDENS

controllerRouter.get('/order', clientAuth, OrdemController.index);
controllerRouter.get('/order/:id', clientAuth, OrdemController.show);
controllerRouter.post('/opensales', clientAuth, OrdemController.showOpenSales);
controllerRouter.post('/insertedsales', clientAuth, OrdemController.showInsertedSales);
controllerRouter.post('/selectedpaymentsales', clientAuth, OrdemController.showSelectedPaymentSales);

export default controllerRouter;