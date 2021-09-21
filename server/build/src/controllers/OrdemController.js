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
const Ordem_1 = __importDefault(require("../models/Ordem"));
const ordem_view_1 = __importDefault(require("../view/ordem_view"));
const ClienteFinal_1 = __importDefault(require("../models/ClienteFinal"));
const ClienteController_1 = __importDefault(require("./ClienteController"));
exports.default = {
    async index(request, response) {
        const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
        const ordens = await ordensRepository.find();
        if (ordens.length === 0) {
            return response.status(204).json({ "Vazio": "Nenhuma Ordem Cadastrada." });
        }
        else {
            return response.json(ordem_view_1.default.renderMany(ordens));
        }
    },
    async show(request, response) {
        try {
            const { id } = request.params;
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const ordem = await ordensRepository.findOne({
                where: {
                    cd_id_ccli: id
                }
            });
            if (ordem === undefined) {
                return response.status(404).json({ "Erro": "Nenhuma Ordem Cadastrada neste Usuário" });
            }
            else {
                return response.json(ordem_view_1.default.render(ordem));
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async showOpenSales(request, response) {
        try {
            const { userCode } = request.body;
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            var openSales;
            if (userCode !== undefined) {
                openSales = await ordensRepository.find({
                    where: {
                        cd_id_ccli: userCode,
                        cd_habil_tipo: 217
                    }
                });
            }
            else {
                openSales = await ordensRepository.find({
                    where: {
                        cd_habil_tipo: 217
                    }
                });
            }
            if (openSales === undefined) {
                return response.status(404).json({ "Erro": "Nenhuma Ordem Aberta" });
            }
            else {
                if (openSales.length <= 0) {
                    return response.status(204).json({ "Vazio": "Nenhuma Ordem Aberta" });
                }
                else {
                    return response.json(ordem_view_1.default.renderMany(openSales));
                }
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async showInsertedSales(request, response) {
        try {
            const { userCode } = request.body;
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            var insertedSales;
            if (userCode !== undefined) {
                insertedSales = await ordensRepository.find({
                    where: {
                        cd_id_ccli: userCode,
                        cd_habil_tipo: 218
                    }
                });
            }
            else {
                insertedSales = await ordensRepository.find({
                    where: {
                        cd_habil_tipo: 218
                    }
                });
            }
            if (insertedSales === undefined) {
                return response.status(404).json({ "Erro": "Nenhuma Ordem Aberta" });
            }
            else {
                if (insertedSales.length <= 0) {
                    return response.status(204).json({ "Vazio": "Nenhuma Ordem Aberta" });
                }
                else {
                    return response.json(ordem_view_1.default.renderMany(insertedSales));
                }
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async showSelectedPaymentSales(request, response) {
        try {
            const { userCode } = request.body;
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            var selectedPaymentOrdem;
            if (userCode !== undefined) {
                selectedPaymentOrdem = await ordensRepository.find({
                    where: {
                        cd_id_ccli: userCode,
                        cd_habil_tipo: 219
                    }
                });
            }
            else {
                selectedPaymentOrdem = await ordensRepository.find({
                    where: {
                        cd_habil_tipo: 219
                    }
                });
            }
            if (selectedPaymentOrdem === undefined) {
                return response.status(404).json({ "Erro": "Nenhuma Ordem Aberta" });
            }
            else {
                if (selectedPaymentOrdem.length <= 0) {
                    return response.status(204).json({ "Vazio": "Nenhuma Ordem Aberta" });
                }
                else {
                    return response.json(ordem_view_1.default.renderMany(selectedPaymentOrdem));
                }
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async edit(request, response) {
        try {
            const { id } = request.params;
            var { totalPrice, orderNotes, itens, clientId, client, userCode } = request.body;
            if (orderNotes === '')
                orderNotes = 'Observação Não Inserida';
            itens.forEach(item => {
                if (item.cd_codigogerado === '')
                    item.cd_codigogerado = 'Código Vazio';
                if (item.nm_produto === '')
                    item.nm_produto = 'Nome Não Inserido';
                if (item.vl_preco)
                    item.vl_preco = parseInt(item.vl_preco.replace(/\D/g, ""));
                if (item.vl_preco === '')
                    item.vl_preco = 0;
            });
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const clientesRepository = typeorm_1.getRepository(ClienteFinal_1.default);
            const totalClienteOrdens = await ordensRepository.find({
                where: {
                    cd_clientefinal: clientId
                }
            });
            const existOrdem = await ordensRepository.findOne({
                where: {
                    cd_id: id
                }
            });
            const existCliente = await clientesRepository.findOne({
                where: {
                    nm_nome: client.clientName
                }
            });
            if (existOrdem === undefined) {
                return response.status(404).json({ "Erro": "Ordem não Existe." });
            }
            else {
                if (totalClienteOrdens.length === 1) {
                    if (existCliente != undefined) {
                        if (existOrdem.cd_clientefinal === clientId) {
                            existOrdem.vl_total = totalPrice;
                            existOrdem.tx_obs = orderNotes;
                            existOrdem.cd_habil_tipo = 217;
                            existOrdem.itens = itens;
                            existCliente.tx_cgc = client.clientCgc;
                            existCliente.tx_email = client.clientEmail;
                            existCliente.tx_fone = client.clientPhone;
                            existCliente.tx_obs = client.clientNotes;
                            await clientesRepository.save(existCliente);
                            await ordensRepository.save(existOrdem);
                            return response.status(200).json(existOrdem);
                        }
                        else {
                            return response.status(406).json({ "Erro": "Não é permitido alterar o Cliente após Criar Venda." });
                        }
                    }
                    else {
                        return response.status(406).json({ 'Erro': 'Não é permitido Alterar o Nome do Cliente' });
                    }
                }
                else {
                    if (existCliente != undefined) {
                        if (existCliente.tx_email != client.clientEmail || existCliente.tx_fone != client.clientPhone || existCliente.tx_obs != client.clientNotes) {
                            // CRIAR NOVO CLIENTE E SALVAR ORDEM
                            const clienteData = {
                                nm_nome: client.clientName,
                                tx_cgc: client.clientCgc,
                                tx_fone: client.clientPhone,
                                tx_email: client.clientEmail,
                                tx_obs: client.clientNotes,
                                cd_id_ccli: userCode,
                                cd_ordem_id: id
                            };
                            const createCliente = await ClienteController_1.default.create(request, response, clienteData);
                            if (createCliente != undefined) {
                                if (createCliente.statusCode === 201) {
                                    const existClienteCreated = await clientesRepository.findOne({
                                        where: {
                                            nm_nome: client.clientName,
                                            tx_cgc: client.clientCgc,
                                            tx_fone: client.clientPhone,
                                            tx_email: client.clientEmail,
                                            tx_obs: client.clientNotes
                                        }
                                    });
                                    if (existClienteCreated != undefined) {
                                        const responseClienteId = existClienteCreated.cd_pessoa;
                                        existOrdem.vl_total = totalPrice;
                                        existOrdem.tx_obs = orderNotes;
                                        existOrdem.cd_habil_tipo = 217;
                                        existOrdem.itens = itens;
                                        existOrdem.cd_clientefinal = existClienteCreated.cd_pessoa;
                                        await ordensRepository.save(existOrdem);
                                        return response.status(201).json(existOrdem);
                                    }
                                }
                                else {
                                    return response.status(createCliente.statusCode).json(createCliente.json);
                                }
                            }
                            else {
                                return response.status(400).json({ 'Erro': 'Não foi Possível Criar o Cliente.' });
                            }
                        }
                        else {
                            existOrdem.vl_total = totalPrice;
                            existOrdem.tx_obs = orderNotes;
                            existOrdem.cd_habil_tipo = 217;
                            existOrdem.itens = itens;
                            await ordensRepository.save(existOrdem);
                            return response.status(201).json({ 'Ok!': 'Venda Editada.' });
                        }
                    }
                }
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async editCondition(request, response) {
        try {
            const { id } = request.params;
            const { condition } = request.body;
            const setCondition = parseInt(condition);
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const existOrdem = await ordensRepository.findOne({
                where: {
                    cd_id: id
                }
            });
            if (existOrdem === undefined) {
                return response.status(404).json({ "Erro": "Ordem não Econtrada" });
            }
            else {
                existOrdem.cd_habil_tipo = setCondition;
                await ordensRepository.save(existOrdem);
                return response.status(200).json(existOrdem);
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async delete(request, response) {
        try {
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            var d = new Date();
            d.setDate(d.getDate() - 30);
            const existOrdem = await ordensRepository.find({
                where: {
                    dt_criado: typeorm_1.LessThan(d)
                }, relations: ['itens']
            });
            if (existOrdem.length <= 0) {
                return response.status(202).json({ "Ok!": 'Nenhuma Ordem anterior a esta Data' });
            }
            else {
                existOrdem.map(async (ordem) => {
                    await ordensRepository.remove(ordem);
                });
                return response.status(200).json({});
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async deleteNotAllowed(request, response) {
        try {
            const { id } = request.params;
            const searchId = parseInt(id);
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const existOrdem = await ordensRepository.find({
                where: {
                    cd_id: searchId
                }, relations: ['itens']
            });
            if (existOrdem.length <= 0) {
                return response.status(302).json({ "Erro": 'Nenhuma Ordem anterior a esta Data' });
            }
            else {
                existOrdem.map(async (ordem) => {
                    await ordensRepository.remove(ordem);
                });
                return response.status(200).json({});
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async create(request, response) {
        try {
            /* CRIAR NOVA ORDEM DE VENDA
              VEM DO APP { userCode, createdAt, totalPrice, orderNotes, condition }
              VAI PARA O BANCO { cd_id_ccli, dt_criado, vl_total, tx_obs, cd_habil_tipo }
            */
            var { userCode, totalPrice, orderNotes, client, itens } = request.body;
            if (orderNotes === undefined)
                orderNotes = 'Observação Não Inserida';
            itens.forEach((item, index, object) => {
                if (item.vl_preco === 0)
                    object.splice(index, 1);
                if (item.vl_preco === '')
                    object.splice(index, 1);
                if (item.cd_codigogerado === '')
                    item.cd_codigogerado = 'Código Vazio';
                if (item.nm_produto === '')
                    item.nm_produto = 'Nome Não Inserido';
                if (item.vl_preco)
                    item.vl_preco = parseInt(item.vl_preco.replace(/\D/g, ""));
            });
            console.log(itens);
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const clientesRepository = typeorm_1.getRepository(ClienteFinal_1.default);
            const existCliente = await clientesRepository.findOne({
                where: {
                    nm_nome: client.clientName
                }
            });
            if (existCliente != undefined) {
                const codPessoa = existCliente.cd_pessoa;
                const data = {
                    cd_id_ccli: userCode,
                    dt_criado: new Date(),
                    vl_total: totalPrice,
                    tx_obs: orderNotes,
                    cd_habil_tipo: 217,
                    cd_clientefinal: codPessoa,
                    itens
                };
                const schema = Yup.object().shape({
                    cd_id_ccli: Yup.string().required(),
                    dt_criado: Yup.date().default(() => new Date()),
                    vl_total: Yup.string().required(),
                    tx_obs: Yup.string().required(),
                    cd_habil_tipo: Yup.number().required(),
                    cd_clientefinal: Yup.number().required(),
                    itens: Yup.array(Yup.object().shape({
                        id: Yup.number().strip(),
                        nm_produto: Yup.string().nullable(),
                        cd_codigogerado: Yup.string().required(),
                        vl_preco: Yup.string().required()
                    }))
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                const ordemRepository = ordensRepository.create(data);
                await ordensRepository.save(ordemRepository);
                return response.status(201).json(ordemRepository);
            }
            else {
                // CRIAR NOVO CLIENTE E SALVAR ORDEM
                const clienteData = {
                    nm_nome: client.clientName,
                    tx_cgc: client.clientCgc,
                    tx_fone: client.clientPhone,
                    tx_email: client.clientEmail,
                    tx_obs: client.clientNotes,
                    cd_id_ccli: userCode,
                    cd_ordem_id: 1
                };
                const createCliente = await ClienteController_1.default.create(request, response, clienteData);
                if (createCliente != undefined) {
                    if (createCliente.statusCode === 201) {
                        const existClienteCreated = await clientesRepository.findOne({
                            where: {
                                nm_nome: client.clientName
                            }
                        });
                        const responseClienteId = existClienteCreated === null || existClienteCreated === void 0 ? void 0 : existClienteCreated.cd_pessoa;
                        const data = {
                            cd_id_ccli: userCode,
                            dt_criado: new Date(),
                            vl_total: totalPrice,
                            tx_obs: orderNotes,
                            cd_habil_tipo: 0,
                            cd_clientefinal: responseClienteId,
                            itens
                        };
                        const schema = Yup.object().shape({
                            cd_id_ccli: Yup.string().required(),
                            dt_criado: Yup.date().default(() => new Date()),
                            vl_total: Yup.string().required(),
                            tx_obs: Yup.string().required(),
                            cd_habil_tipo: Yup.number().required(),
                            cd_clientefinal: Yup.number().required(),
                            itens: Yup.array(Yup.object().shape({
                                nm_produto: Yup.string().nullable(),
                                cd_codigogerado: Yup.string().required(),
                                vl_preco: Yup.number().required()
                            }))
                        });
                        await schema.validate(data, {
                            abortEarly: false,
                        });
                        const ordemRepository = ordensRepository.create(data);
                        await ordensRepository.save(ordemRepository);
                        return response.json(ordemRepository);
                    }
                    else {
                        return response.status(createCliente.statusCode).json(createCliente.json);
                    }
                }
                else {
                    return;
                }
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    //  MYCLIENTS
    async userOrders(request, response) {
        try {
            const { id } = request.params;
            const searchId = parseInt(id);
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const ordens = await ordensRepository.find({
                where: {
                    cd_id_ccli: searchId
                }, relations: ['itens']
            });
            if (ordens.length === 0) {
                return response.status(204).json({ "Vazio": "Nenhuma Ordem Cadastrada" });
            }
            else {
                return response.json(ordem_view_1.default.renderManyWithItens(ordens));
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async userSavedOrders(request, response) {
        try {
            const { id } = request.params;
            const searchId = parseInt(id);
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const ordens = await ordensRepository.find({
                where: [
                    { cd_id_ccli: searchId, cd_habil_tipo: typeorm_1.LessThanOrEqual(219) },
                ],
                relations: ['itens'],
                order: {
                    cd_id: "DESC"
                }
            });
            if (ordens.length === 0) {
                return response.status(204).json({ "Vazio": "Nenhuma Ordem Salva" });
            }
            else {
                return response.json(ordem_view_1.default.renderManyWithItens(ordens));
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async userHystory(request, response) {
        try {
            const { id } = request.params;
            const searchId = parseInt(id);
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const ordens = await ordensRepository.find({
                relations: ['itens'],
                where: [
                    { cd_id_ccli: searchId, cd_habil_tipo: typeorm_1.MoreThan(219) },
                ],
                order: {
                    cd_id: "DESC"
                }
            });
            if (ordens.length === 0) {
                return response.status(204).json({ "Vazio": "Histórico Vazio" });
            }
            else {
                return response.json(ordem_view_1.default.renderManyWithItens(ordens));
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async historyPaid(request, response) {
        try {
            const { id } = request.params;
            const searchId = parseInt(id);
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const ordens = await ordensRepository.find({
                where: [
                    { cd_id_ccli: searchId, cd_habil_tipo: typeorm_1.In([220, 223, 224]) },
                ],
                order: {
                    cd_id: "DESC"
                }
            });
            if (ordens.length === 0) {
                return response.status(204).json({ "Vazio": "Histórico Vazio" });
            }
            else {
                return response.json(ordem_view_1.default.renderMany(ordens));
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async historyNotPaid(request, response) {
        try {
            const { id } = request.params;
            const searchId = parseInt(id);
            const ordensRepository = typeorm_1.getRepository(Ordem_1.default);
            const ordens = await ordensRepository.find({
                where: [
                    { cd_id_ccli: searchId, cd_habil_tipo: typeorm_1.Between(221, 222) },
                ],
                order: {
                    cd_id: "DESC"
                }
            });
            if (ordens.length === 0) {
                return response.status(204).json({ "Vazio": "Histórico Vazio" });
            }
            else {
                return response.json(ordem_view_1.default.renderMany(ordens));
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    }
    /*async pSeguro(request: Request, response: Response) {
      try {
  
        const { payload } = request.body;
        const { document } = request.params;
        const { header } = request.headers;
  
        const hash = createHash("sha256").update(`${payload}-${pagSegurotoken}`).digest('hex');
  
        console.log(header, document, payload);
  
      }catch(err) {
        return response.status(400).json({ "Erro": err });
      }
    }*/
};
