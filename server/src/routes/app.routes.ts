import { Router } from 'express'

import { clientAuth } from '../middleware/auth'

import ClienteController from '../controllers/ClienteController'
import OrdemController from '../controllers/OrdemController'
import SenhaController from '../controllers/SenhaController'

const appRouter = Router()

// ----------------------- APLICAÇÃO

// ------------------------ USUÁRIO

appRouter.post('/login', SenhaController.login)
appRouter.put('/changepassword', clientAuth, SenhaController.changePassword)

// ------------------------ CLIENTES

appRouter.get('/myClients/:id', clientAuth, ClienteController.userClients)

// ------------------------- ORDENS

// - TODAS AS ORDENS
appRouter.get('/myOrders/:id', clientAuth, OrdemController.userOrders)
appRouter.post('/order', clientAuth, OrdemController.create)
appRouter.put('/order/:id', clientAuth, OrdemController.edit)
appRouter.put('/order/condition/:id', clientAuth, OrdemController.editCondition)

// - ORDENS SALVAS
appRouter.get('/myOrders/saved/:id', clientAuth, OrdemController.userSavedOrders)

// - HISTÓRICO
appRouter.get('/myOrders/history/all/:id', clientAuth, OrdemController.userHystory)
appRouter.get('/myOrders/history/paid/:id', clientAuth, OrdemController.historyPaid)
appRouter.get('/myOrders/history/notPaid/:id', clientAuth, OrdemController.historyNotPaid)
appRouter.delete('/order', clientAuth, OrdemController.delete)

export default appRouter
