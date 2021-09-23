"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

require("reflect-metadata");

require("./database/connection");

var _routes = _interopRequireDefault(require("./routes/routes"));

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_routes["default"]);
app.get('/', function (req, res) {
  res.sendFile(_path["default"].resolve('src/page/welcome.html'));
});
app.get('/privacy', function (req, res) {
  res.sendFile(_path["default"].resolve('src/page/privacy.html'));
});
app.listen(3333, function () {
  console.log('Rodando.');
});