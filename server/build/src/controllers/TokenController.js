"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const Token_1 = __importDefault(require("../models/Token"));
const token_view_1 = __importDefault(require("../view/token_view"));
exports.default = {
    async index(request, response) {
        const tokensRepository = typeorm_1.getRepository(Token_1.default);
        const tokens = await tokensRepository.find();
        if (tokens.length === 0) {
            return response.status(204).json({ "Vazio": "Nenhum Token Inserido." });
        }
        else {
            return response.status(200).json([token_view_1.default.renderMany(tokens), request.userId]);
        }
    },
    async show(request, response) {
        const { id } = request.params;
        const searchId = parseInt(id);
        const tokensRepository = typeorm_1.getRepository(Token_1.default);
        const token = await tokensRepository.findOneOrFail(searchId);
        if (token) {
            return response.json(token_view_1.default.render(token));
        }
        else {
            return response.status(404);
        }
    },
    async create(request, response) {
        try {
            /* CRIAR NOVO TOKEN DE DISPOSITIVO FÍSICO PARA
            GERENCIAMENTO DE EVETOS E NOTIFICAÇÕES
            VEM DO APP COMO { id, deviceToken, createdAt, updatedAt }
            SAI PARA O BANCO { id, token_celular, dt_criado, dt_modificado }
      
            NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS
            RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
            */
            const { deviceToken } = request.body;
            const tokensRepository = typeorm_1.getRepository(Token_1.default);
            const existToken = await tokensRepository.findOne({
                where: [
                    { token_celular: deviceToken }
                ]
            });
            if (!existToken && existToken !== '') {
                const data = {
                    token_celular: deviceToken,
                    dt_criado: new Date(),
                    dt_modificado: new Date()
                };
                const schema = Yup.object().shape({
                    token_celular: Yup.string().required(),
                    dt_criado: Yup.date().required(),
                    dt_modificado: Yup.date().required(),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                const tokenRepository = tokensRepository.create(data);
                await tokensRepository.save(tokenRepository);
                return response.status(201).json(tokenRepository);
            }
            else {
                return response.status(409).json({ "Ops!": "Token já Cadastrado" });
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    }
};
