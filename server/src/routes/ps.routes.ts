import { Router } from 'express';

import { clientAuth } from '../middleware/auth';

import OrdemController from '../controllers/OrdemController';

const psController = Router();

/*
  ROTAS DISTINTAS PARA PAGSEGURO
*/

// psController.post('/myPagSeguro/:document', OrdemController.pSeguro);

export default psController;