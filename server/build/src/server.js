"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("./database/connection");
const routes_1 = __importDefault(require("./routes/routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.resolve('src/page/welcome.html'));
});
app.get('/privacy', (req, res) => {
    res.sendFile(path_1.default.resolve('src/page/privacy.html'));
});
app.listen(3333, () => {
    console.log('Rodando.');
});
