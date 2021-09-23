"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../middleware/auth");

var _ClienteController = _interopRequireDefault(require("../controllers/ClienteController"));

var _EventoController = _interopRequireDefault(require("../controllers/EventoController"));

var _OrdemController = _interopRequireDefault(require("../controllers/OrdemController"));

var _SenhaController = _interopRequireDefault(require("../controllers/SenhaController"));

var _TokenController = _interopRequireDefault(require("../controllers/TokenController"));

var controllerRouter = (0, _express.Router)(); // ---------------------- CONTROLE
// -- CRIPTOGRAFAR SENHAS

/* 
  CASO A CREDENCIAL JWTSECRET FOR ALTERADA APÓS A APLICAÇÃO ESTAR EM
  PRODUÇÃO, ENVIAR UMA REQUISIÇÃO DO TIPO POST COM O CORPO EM JSON
  COM A VARIÁVEL "PASSWORD" COM O PARÂMETRO DA "SEGUNDASENHA".
*/

controllerRouter.post('/hashpasswords', _auth.clientAuth, _SenhaController["default"].hashPasswords); // -- LOGS

controllerRouter.get('/evento', _auth.clientAuth, _EventoController["default"].index);
controllerRouter.get('/evento/:id', _auth.clientAuth, _EventoController["default"].show);
controllerRouter.post('/evento', _auth.clientAuth, _EventoController["default"].create); // -- TODOS USUÁRIOS

controllerRouter.get('/senha', _auth.clientAuth, _SenhaController["default"].index);
controllerRouter.get('/senha/:cgc', _auth.clientAuth, _SenhaController["default"].show);
controllerRouter.post('/senha', _SenhaController["default"].create);
controllerRouter.put('/acesso', _auth.clientAuth, _SenhaController["default"]["switch"]);
controllerRouter.put('/senha/:cgc', _auth.clientAuth, _SenhaController["default"].edit);
controllerRouter["delete"]('/senha/:cgc', _auth.clientAuth, _SenhaController["default"]["delete"]);
controllerRouter.post('/resetpassword', _SenhaController["default"].resetPassword); // -- TOKEN DE DISPOSITIVOS

controllerRouter.get('/token', _auth.clientAuth, _TokenController["default"].index);
controllerRouter.post('/token/:id', _auth.clientAuth, _TokenController["default"].show);
controllerRouter.post('/token', _TokenController["default"].create); // -- TODOS OS CLIENTES FINAIS

controllerRouter.get('/client', _auth.clientAuth, _ClienteController["default"].index);
controllerRouter.get('/client/orders', _auth.clientAuth, _ClienteController["default"].showWithOrders);
controllerRouter.get('/client/:id', _auth.clientAuth, _ClienteController["default"].show);
controllerRouter.post('/client', _auth.clientAuth, _ClienteController["default"].create);
controllerRouter.put('/cliente/:id', _auth.clientAuth, _ClienteController["default"].edit); // -- TODAS AS ORDENS

controllerRouter.get('/order', _auth.clientAuth, _OrdemController["default"].index);
controllerRouter.get('/order/:id', _auth.clientAuth, _OrdemController["default"].show);
controllerRouter.post('/opensales', _auth.clientAuth, _OrdemController["default"].showOpenSales);
controllerRouter.post('/insertedsales', _auth.clientAuth, _OrdemController["default"].showInsertedSales);
controllerRouter.post('/selectedpaymentsales', _auth.clientAuth, _OrdemController["default"].showSelectedPaymentSales);
var _default = controllerRouter;
exports["default"] = _default;