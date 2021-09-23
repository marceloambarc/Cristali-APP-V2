"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _app = _interopRequireDefault(require("./app.routes"));

var _controller = _interopRequireDefault(require("./controller.routes"));

// import psController from './ps.routes';
var routes = (0, _express.Router)();
routes.use(_app["default"]);
routes.use(_controller["default"]); // routes.use(psController);

var _default = routes;
exports["default"] = _default;