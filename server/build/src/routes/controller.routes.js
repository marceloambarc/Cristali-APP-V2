"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const ClienteController_1 = __importDefault(require("../controllers/ClienteController"));
const EventoController_1 = __importDefault(require("../controllers/EventoController"));
const OrdemController_1 = __importDefault(require("../controllers/OrdemController"));
const SenhaController_1 = __importDefault(require("../controllers/SenhaController"));
const TokenController_1 = __importDefault(require("../controllers/TokenController"));
const controllerRouter = express_1.Router();
// ---------------------- CONTROLE
// -- CRIPTOGRAFAR SENHAS
/*
  CASO A CREDENCIAL JWTSECRET FOR ALTERADA APÓS A APLICAÇÃO ESTAR EM
  PRODUÇÃO, ENVIAR UMA REQUISIÇÃO DO TIPO POST COM O CORPO EM JSON
  COM A VARIÁVEL "PASSWORD" COM O PARÂMETRO DA "SEGUNDASENHA".
*/
controllerRouter.post('/hashpasswords', auth_1.clientAuth, SenhaController_1.default.hashPasswords);
// -- LOGS
controllerRouter.get('/evento', auth_1.clientAuth, EventoController_1.default.index);
controllerRouter.get('/evento/:id', auth_1.clientAuth, EventoController_1.default.show);
controllerRouter.post('/evento', auth_1.clientAuth, EventoController_1.default.create);
// -- TODOS USUÁRIOS
controllerRouter.get('/senha', auth_1.clientAuth, SenhaController_1.default.index);
controllerRouter.get('/senha/:cgc', auth_1.clientAuth, SenhaController_1.default.show);
controllerRouter.post('/senha', SenhaController_1.default.create);
controllerRouter.put('/acesso', auth_1.clientAuth, SenhaController_1.default.switch);
controllerRouter.put('/senha/:cgc', auth_1.clientAuth, SenhaController_1.default.edit);
controllerRouter.delete('/senha/:cgc', auth_1.clientAuth, SenhaController_1.default.delete);
controllerRouter.post('/resetpassword', SenhaController_1.default.resetPassword);
// -- TOKEN DE DISPOSITIVOS
controllerRouter.get('/token', auth_1.clientAuth, TokenController_1.default.index);
controllerRouter.post('/token/:id', auth_1.clientAuth, TokenController_1.default.show);
controllerRouter.post('/token', TokenController_1.default.create);
// -- TODOS OS CLIENTES FINAIS
controllerRouter.get('/client', auth_1.clientAuth, ClienteController_1.default.index);
controllerRouter.get('/client/orders', auth_1.clientAuth, ClienteController_1.default.showWithOrders);
controllerRouter.get('/client/:id', auth_1.clientAuth, ClienteController_1.default.show);
controllerRouter.post('/client', auth_1.clientAuth, ClienteController_1.default.create);
controllerRouter.put('/cliente/:id', auth_1.clientAuth, ClienteController_1.default.edit);
// -- TODAS AS ORDENS
controllerRouter.get('/order', auth_1.clientAuth, OrdemController_1.default.index);
controllerRouter.get('/order/:id', auth_1.clientAuth, OrdemController_1.default.show);
controllerRouter.post('/opensales', auth_1.clientAuth, OrdemController_1.default.showOpenSales);
controllerRouter.post('/insertedsales', auth_1.clientAuth, OrdemController_1.default.showInsertedSales);
controllerRouter.post('/selectedpaymentsales', auth_1.clientAuth, OrdemController_1.default.showSelectedPaymentSales);
exports.default = controllerRouter;
