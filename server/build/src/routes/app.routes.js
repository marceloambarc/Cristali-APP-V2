"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const ClienteController_1 = __importDefault(require("../controllers/ClienteController"));
const OrdemController_1 = __importDefault(require("../controllers/OrdemController"));
const SenhaController_1 = __importDefault(require("../controllers/SenhaController"));
const appRouter = express_1.Router();
// ----------------------- APLICAÇÃO
// ------------------------ USUÁRIO 
appRouter.post('/login', SenhaController_1.default.login);
appRouter.put('/changepassword', auth_1.clientAuth, SenhaController_1.default.changePassword);
// ------------------------ CLIENTES
appRouter.get('/myClients/:id', auth_1.clientAuth, ClienteController_1.default.userClients);
// ------------------------- ORDENS
// - TODAS AS ORDENS
appRouter.get('/myOrders/:id', auth_1.clientAuth, OrdemController_1.default.userOrders);
appRouter.post('/order', auth_1.clientAuth, OrdemController_1.default.create);
appRouter.put('/order/:id', auth_1.clientAuth, OrdemController_1.default.edit);
appRouter.put('/order/condition/:id', auth_1.clientAuth, OrdemController_1.default.editCondition);
// - ORDENS SALVAS
appRouter.get('/myOrders/saved/:id', auth_1.clientAuth, OrdemController_1.default.userSavedOrders);
// - HISTÓRICO
appRouter.get('/myOrders/history/all/:id', auth_1.clientAuth, OrdemController_1.default.userHystory);
appRouter.get('/myOrders/history/paid/:id', auth_1.clientAuth, OrdemController_1.default.historyPaid);
appRouter.get('/myOrders/history/notPaid/:id', auth_1.clientAuth, OrdemController_1.default.historyNotPaid);
appRouter.delete('/order', auth_1.clientAuth, OrdemController_1.default.delete);
exports.default = appRouter;
