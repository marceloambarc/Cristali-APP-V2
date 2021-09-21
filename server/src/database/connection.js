"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
typeorm_1.createConnection().then(() => {
    console.log('Conexão com o banco de dados.');
}).catch(err => {
    console.log(err);
});
