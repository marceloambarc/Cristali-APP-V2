"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.clientAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credentials_1 = require("../../credentials");
function clientAuth(request, response, next) {
    const { authorization } = request.headers;
    if (authorization != undefined) {
        const token = authorization.replace('Bearer', '').trim();
        try {
            const data = jsonwebtoken_1.default.verify(token, credentials_1.JWTSecretUser);
            //Retornar Parametros necessários.
            /*const { id } = data as TokenPayload;
            request.userId = id;*/
            return next();
        }
        catch (_a) {
            response.status(401).json({ "Erro": "Problema na Autenticação." });
        }
    }
    else {
        response.status(401).json({ "Erro": "Token Inválido" });
    }
}
exports.clientAuth = clientAuth;
function adminAuth(request, response, next) {
    const { authorization } = request.headers;
    if (authorization != undefined) {
        const token = authorization.replace('Bearer', '').trim();
        try {
            const data = jsonwebtoken_1.default.verify(token, credentials_1.JWTSecretAdmin);
            if (data != undefined) {
                response.status(403).json({ "Erro": "Rota não Autorizada." });
            }
            else {
                response.status(401).json({ "Erro": "Problema na Autenticação." });
            }
        }
        catch (_a) {
            response.status(401).json({ "Erro": "Problema na Autenticação." });
        }
    }
    else {
        response.status(401).json({ "Erro": "Token Inválido" });
    }
}
exports.adminAuth = adminAuth;
