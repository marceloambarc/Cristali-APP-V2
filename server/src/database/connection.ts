import { createConnection } from "typeorm";

createConnection().then(() => {
  console.log('Conexão com o banco de dados.');
}).catch(err => {
  console.log(err)});