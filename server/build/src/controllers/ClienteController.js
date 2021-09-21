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
const ClienteFinal_1 = __importDefault(require("../models/ClienteFinal"));
const cliente_view_1 = __importDefault(require("../view/cliente_view"));
exports.default = {
    async index(request, response) {
        const clientesFinalRepository = typeorm_1.getRepository(ClienteFinal_1.default);
        const clientesFinal = await clientesFinalRepository.find();
        if (clientesFinal.length === 0) {
            return response.status(204).json({ "Vazio": "Nenhum Cliente Final Cadastrado" });
        }
        else {
            return response.json(cliente_view_1.default.renderMany(clientesFinal));
        }
    },
    async show(request, response) {
        try {
            const { id } = request.params;
            const searchId = parseInt(id);
            const clientesFinalRepository = typeorm_1.getRepository(ClienteFinal_1.default);
            const cliente = await clientesFinalRepository.findOneOrFail(searchId);
            return response.json(cliente_view_1.default.render(cliente));
        }
        catch (err) {
            return response.status(404).json({ "Erro": "Nenhum Cliente encontrado com este Parâmetro." });
        }
    },
    async showWithOrders(request, response) {
        try {
            const { clientName } = request.body;
            const clientesFinalRepository = typeorm_1.getRepository(ClienteFinal_1.default);
            const existCliente = await clientesFinalRepository.findOne({
                where: [
                    { nm_nome: clientName }
                ]
            });
            if (existCliente === undefined) {
                return response.status(404).json({ "Erro": "Cliente não Econtrado." });
            }
            else {
                return response.json(cliente_view_1.default.render(existCliente));
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async edit(request, response) {
        try {
            const { id } = request.params;
            const { clientName, clientCgc, clientPhone, clientEmail, clientNotes } = request.body;
            const clientesFinalRepository = typeorm_1.getRepository(ClienteFinal_1.default);
            const existClienteFinal = await clientesFinalRepository.findOne({
                where: {
                    cd_pessoa: id
                }
            });
            if (existClienteFinal === undefined) {
                return response.status(404).json({ "Erro": "Cliente não Existe" });
            }
            else {
                existClienteFinal.nm_nome = clientName;
                existClienteFinal.tx_cgc = clientCgc;
                existClienteFinal.tx_fone = clientPhone;
                existClienteFinal.tx_email = clientEmail;
                existClienteFinal.tx_obs = clientNotes;
                await clientesFinalRepository.save(existClienteFinal);
                return response.status(200).json(existClienteFinal);
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async create(request, response, clienteData) {
        try {
            /*
              CRIAR NOVO CLIENTE.
              VEM DO APP COMO { clientName, clientPhone, clientEmail, clientNotes }
              SAI PARA O BANCO { nm_nome, tx_fone, tx_email, tx_obs }
            */
            const { clientName, clientCgc, clientPhone, clientEmail, clientNotes, userCode, } = request.body;
            const clientesFinalRepository = typeorm_1.getRepository(ClienteFinal_1.default);
            if (clientName === undefined) {
                if (clienteData === undefined) {
                    return response.status(400).json({ "Erro": "Parâmetros não Enviados." });
                }
                else {
                    const schema = Yup.object().shape({
                        nm_nome: Yup.string().required(),
                        tx_cgc: Yup.string().nullable(),
                        tx_fone: Yup.string().nullable(),
                        tx_email: Yup.string().nullable(),
                        tx_obs: Yup.string().nullable(),
                        cd_id_ccli: Yup.string().required(),
                        cd_ordem_id: Yup.number().required()
                    });
                    await schema.validate(clienteData, {
                        abortEarly: false,
                    });
                    const clientefinalRepository = clientesFinalRepository.create(clienteData);
                    await clientesFinalRepository.save(clientefinalRepository);
                    return response.status(201);
                }
            }
            else {
                const existCliente = await clientesFinalRepository.findOne({
                    where: {
                        nm_nome: clientName
                    }
                });
                if (existCliente != undefined) {
                    const data = {
                        nm_nome: clientName,
                        tx_cgc: clientCgc,
                        tx_fone: clientPhone,
                        tx_email: clientEmail,
                        tx_obs: clientNotes,
                        cd_id_ccli: userCode,
                        cd_ordem_id: userCode
                    };
                    const schema = Yup.object().shape({
                        nm_nome: Yup.string().required(),
                        tx_cgc: Yup.string().nullable(),
                        tx_fone: Yup.string().nullable(),
                        tx_email: Yup.string().required(),
                        tx_obs: Yup.string().nullable(),
                        cd_id_ccli: Yup.string().required(),
                        cd_ordem_id: Yup.number().required()
                    });
                    await schema.validate(data, {
                        abortEarly: false,
                    });
                    const clientefinalRepository = clientesFinalRepository.create(data);
                    await clientesFinalRepository.save(clientefinalRepository);
                    return response.status(201).json(clientefinalRepository);
                }
                else {
                    return response.status(409).json({ "Erro": "Cliente Já Cadastrado." });
                }
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    // MYCLIENTS
    async userClients(request, response) {
        try {
            const { id } = request.params;
            const searchId = parseInt(id);
            const clientesFinalRepository = typeorm_1.getRepository(ClienteFinal_1.default);
            const clientes = await clientesFinalRepository.find({
                where: {
                    cd_id_ccli: searchId
                }
            });
            if (clientes.length === 0) {
                return response.status(204).json({ "Vazio": "Nenhuma Cliente Inserida." });
            }
            else {
                return response.json(cliente_view_1.default.renderMany(clientes));
            }
        }
        catch (err) {
            return response.status(404).json({ "Erro": "Nenhum Cliente encontrado com este Parâmetro." });
        }
    }
};
