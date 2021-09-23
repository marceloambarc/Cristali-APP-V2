import express from 'express';
import cors from 'cors';
import path from 'path';
import "reflect-metadata";

import './database/connection';

import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/',(req,res) => {
  res.sendFile(path.resolve('src/page/welcome.html'));
});

app.get('/privacy',(req,res) => {
  res.sendFile(path.resolve('src/page/privacy.html'));
});

app.listen(3333,() => {
  console.log('Rodando.');
});