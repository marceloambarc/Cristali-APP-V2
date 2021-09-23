"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../middleware/auth");

var _ClienteController = _interopRequireDefault(require("../controllers/ClienteController"));

var _OrdemController = _interopRequireDefault(require("../controllers/OrdemController"));

var _SenhaController = _interopRequireDefault(require("../controllers/SenhaController"));

var appRouter = (0, _express.Router)(); // ----------------------- APLICAÇÃO
// ------------------------ USUÁRIO 

appRouter.post('/login', _SenhaController["default"].login);
appRouter.put('/changepassword', _auth.clientAuth, _SenhaController["default"].changePassword); // ------------------------ CLIENTES

appRouter.get('/myClients/:id', _auth.clientAuth, _ClienteController["default"].userClients); // ------------------------- ORDENS
// - TODAS AS ORDENS

appRouter.get('/myOrders/:id', _auth.clientAuth, _OrdemController["default"].userOrders);
appRouter.post('/order', _auth.clientAuth, _OrdemController["default"].create);
appRouter.put('/order/:id', _auth.clientAuth, _OrdemController["default"].edit);
appRouter.put('/order/condition/:id', _auth.clientAuth, _OrdemController["default"].editCondition); // - ORDENS SALVAS

appRouter.get('/myOrders/saved/:id', _auth.clientAuth, _OrdemController["default"].userSavedOrders); // - HISTÓRICO

appRouter.get('/myOrders/history/all/:id', _auth.clientAuth, _OrdemController["default"].userHystory);
appRouter.get('/myOrders/history/paid/:id', _auth.clientAuth, _OrdemController["default"].historyPaid);
appRouter.get('/myOrders/history/notPaid/:id', _auth.clientAuth, _OrdemController["default"].historyNotPaid);
appRouter["delete"]('/order', _auth.clientAuth, _OrdemController["default"]["delete"]);
var _default = appRouter;
exports["default"] = _default;