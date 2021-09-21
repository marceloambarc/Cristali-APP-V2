"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_routes_1 = __importDefault(require("./app.routes"));
const controller_routes_1 = __importDefault(require("./controller.routes"));
// import psController from './ps.routes';
const routes = express_1.Router();
routes.use(app_routes_1.default);
routes.use(controller_routes_1.default);
// routes.use(psController);
exports.default = routes;
