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
const Evento_1 = __importDefault(require("../models/Evento"));
const evento_view_1 = __importDefault(require("../view/evento_view"));
exports.default = {
    async index(request, response) {
        const eventsRepository = typeorm_1.getRepository(Evento_1.default);
        const events = await eventsRepository.find();
        if (events.length === 0) {
            return response.status(204).json({ "Vazio": "Nenhum Evento Cadastrado" });
        }
        else {
            return response.json(evento_view_1.default.renderMany(events));
        }
    },
    async show(request, response) {
        const { id } = request.params;
        const eventsRepository = typeorm_1.getRepository(Evento_1.default);
        const event = await eventsRepository.findOneOrFail(id);
        return response.json(evento_view_1.default.render(event));
    },
    async create(request, response) {
        try {
            /* CRIAR NOVO LOG DE EVENTOS
            VEM DO APP COMO { userCode, eventDescription, userToken, deviceToken }
            SAI PARA O BANCO { cd_ccli, tx_evento, token_cliente, token_celular }
      
            NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS
            RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
            */
            const { userCode, eventDescription, userToken, deviceToken } = request.body;
            const eventsRepository = typeorm_1.getRepository(Evento_1.default);
            const data = {
                dt_evento: new Date(),
                cd_ccli: userCode,
                tx_evento: eventDescription,
                token_cliente: userToken,
                token_celular: deviceToken,
            };
            const schema = Yup.object().shape({
                dt_evento: Yup.date().default(() => new Date()),
                cd_ccli: Yup.string().required(),
                tx_evento: Yup.string().required(),
                token_cliente: Yup.string().required(),
                token_celular: Yup.string().required()
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            const eventRepository = eventsRepository.create(data);
            await eventsRepository.save(eventRepository);
            return response.status(201).json(eventRepository);
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    }
};
