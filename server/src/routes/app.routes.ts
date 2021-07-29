import { Router } from 'express';

import { clientAuth } from '../middleware/auth';

import ClienteController from '../controllers/ClienteController';
import SenhaController from '../controllers/SenhaController';

const appRouter = Router();

// ----------------------- APLICAÇÃO

// -- USUÁRIO 

appRouter.put('/changepassword', clientAuth, SenhaController.changePassword);

// -- CLIENTES

appRouter.post('/myClients', ClienteController.userClients);

// -- ORDENS




export default appRouter;