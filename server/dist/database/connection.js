"use strict";

var _typeorm = require("typeorm");

(0, _typeorm.createConnection)().then(function () {
  console.log('Conexão com o banco de dados.');
})["catch"](function (err) {
  console.log(err);
});