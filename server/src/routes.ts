import { Router } from 'express';
import ClienteController from './controllers/ClienteController';

import EventoController from './controllers/EventoController';
import SenhaController from './controllers/SenhaController';
import TokenController from './controllers/TokenController';

const routes = Router();

// CONTROLE

routes.get('/evento', EventoController.index);
routes.get('/evento/:id', EventoController.show);
routes.post('/evento', EventoController.create);

routes.get('/senha', SenhaController.index);
routes.post('/senha', SenhaController.login);
routes.put('/senha/:id', SenhaController.switch);

routes.get('/token', TokenController.index);
routes.get('/token:id', TokenController.show);
routes.post('/token', TokenController.create);

// APLICAÇÃO

routes.get('/client', ClienteController.index);
routes.get('/client/:id', ClienteController.show);
routes.post('/client', ClienteController.create);

export default routes;