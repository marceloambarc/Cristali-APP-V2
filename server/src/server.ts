import express from 'express';
import cors from 'cors';

import './database/connection';

import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/',(req,res) => {
  res.send('<p>BEM VINDO AO APP CRISTALI DEVELOPER CONTROLER CENTER</p>');
});

app.listen(3333,() => {
  console.log('Rodando.');
});