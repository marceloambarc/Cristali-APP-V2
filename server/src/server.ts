import express from 'express';
import cors from 'cors';

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
  res.send('BEM VINDO AO APP CRISTALI DEVELOPER CONTROLER CENTER');
});

app.listen(3333,() => {
  console.log('Rodando.')
});