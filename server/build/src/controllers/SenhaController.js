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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Yup = __importStar(require("yup"));
const credentials_1 = require("../../credentials");
const credentials_2 = require("../../credentials");
const credentials_3 = require("../../credentials");
const Senha_1 = __importDefault(require("../models/Senha"));
const senha_view_1 = __importDefault(require("../view/senha_view"));
exports.default = {
    async index(request, response) {
        const senhasRepository = typeorm_1.getRepository(Senha_1.default);
        const senhas = await senhasRepository.find();
        if (senhas.length === 0) {
            return response.status(204).json({ "Vazio": "Nenhum Usuário Cadastrado." });
        }
        else {
            return response.json(senha_view_1.default.renderMany(senhas));
        }
    },
    async show(request, response) {
        try {
            const { cgc } = request.params;
            const searchCgc = String(cgc);
            const senhasRepository = typeorm_1.getRepository(Senha_1.default);
            const existSenha = await senhasRepository.find({
                where: {
                    tx_cgc: searchCgc
                }
            });
            if (existSenha.length > 1) {
                return response.json(senha_view_1.default.renderMany(existSenha));
            }
            else {
                return response.status(400).json({ "Erro": 'Mais de um usuário.' });
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async login(request, response) {
        const { cgc, password } = request.body;
        const senhasRepository = typeorm_1.getRepository(Senha_1.default);
        const senha = await senhasRepository.findOne({ "tx_cgc": cgc });
        if (senha === undefined) {
            return response.status(403).send({ "Erro": "Usuário não Cadastrado" });
        }
        else {
            const isPasswordRight = await bcrypt_1.default.compare(password, senha.tx_senha);
            if (!isPasswordRight) {
                return response.status(419).json({ "Erro": "Senha Incorreta" });
            }
            else {
                if (senha.in_ativo === 0) {
                    return response.status(406).json({ "Erro": "Usuário não ativo." });
                }
                else {
                    jsonwebtoken_1.default.sign({ cgc, id: senha.id, isActive: senha.in_ativo, userName: senha.nm_nomecli }, credentials_2.JWTSecretUser, { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            return response.status(401).json({ "Ops": "A sua Sessão Terminou, Faça Login Novamente" });
                        }
                        else {
                            return response.status(200).json({ "token": token, "user": senha_view_1.default.render(senha) });
                        }
                    });
                }
            }
        }
    },
    async hashPasswords(request, response) {
        try {
            const { password } = request.body;
            const senhasRepository = typeorm_1.getRepository(Senha_1.default);
            const senha = await senhasRepository.find();
            if (password === credentials_3.SegundaSenha) {
                senha.forEach(async (user) => {
                    let password = user.tx_senha;
                    let generatedSalt = await bcrypt_1.default.genSalt(credentials_1.salt);
                    let hash = await bcrypt_1.default.hash(password, generatedSalt);
                    user.tx_senha = hash;
                    await senhasRepository.save(user);
                });
                return response.status(200).json({ "OK!": "Senhas criptografadas." });
            }
        }
        catch (err) {
            return response.status(401).json({ "Senha Incorreta": "Entre em contato com o Suporte" });
        }
    },
    async resetPassword(request, response) {
        try {
            const { password, userCgc } = request.body;
            if (password === credentials_3.SegundaSenha) {
                const searchUserCgc = String(userCgc);
                const senhasRepository = typeorm_1.getRepository(Senha_1.default);
                const existSenha = await senhasRepository.findOne({
                    where: {
                        tx_cgc: searchUserCgc
                    }
                });
                if (existSenha === undefined) {
                    return response.status(404).json({ "Erro": "Usuário não existe" });
                }
                else {
                    const newPassword = userCgc;
                    let generatedSalt = await bcrypt_1.default.genSalt(credentials_1.salt);
                    let hash = await bcrypt_1.default.hash(newPassword, generatedSalt);
                    existSenha.tx_senha = hash;
                    await senhasRepository.save(existSenha);
                    return response.status(202).json(senha_view_1.default.render(existSenha));
                }
            }
            else {
                return response.status(400).json({ "Erro": "Código Errado." });
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async changePassword(request, response) {
        try {
            const { userCode, oldPassword, newPassword } = request.body;
            console.log(request.body);
            const searchUserCode = String(userCode);
            const senhasRepository = typeorm_1.getRepository(Senha_1.default);
            const existSenha = await senhasRepository.findOne({
                where: {
                    cd_ccli: searchUserCode
                }
            });
            if (existSenha === undefined) {
                return response.status(404).json({ "Erro": "Usuário não existe" });
            }
            else {
                const isPasswordRight = await bcrypt_1.default.compare(oldPassword, existSenha.tx_senha);
                if (!isPasswordRight) {
                    return response.status(419).json({ "Erro": `Senha Atual Incorreta ${existSenha.nm_nomecli}` });
                }
                else {
                    let generatedSalt = await bcrypt_1.default.genSalt(credentials_1.salt);
                    let hash = await bcrypt_1.default.hash(newPassword, generatedSalt);
                    existSenha.tx_senha = hash;
                    await senhasRepository.save(existSenha);
                    return response.status(202).json(senha_view_1.default.render(existSenha));
                }
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async switch(request, response) {
        try {
            const { cgc } = request.params;
            const { isActive } = request.body;
            const setIsActive = parseInt(isActive);
            const senhasRepository = typeorm_1.getRepository(Senha_1.default);
            const existSenha = await senhasRepository.findOne({
                where: [
                    { tx_cgc: cgc }
                ]
            });
            if (existSenha != undefined) {
                const editedSenha = await senhasRepository.update(existSenha, { "in_ativo": setIsActive });
                if (editedSenha) {
                    return response.status(202).json(senha_view_1.default.render(existSenha));
                }
                else {
                    return response.status(400).json({ "Erro": "Não foi possível editar Usuário." });
                }
            }
            else {
                return response.status(404).json({ "Erro": "Usuário não Encontrado." });
            }
        }
        catch (err) {
            return response.status(400).json({ err });
        }
    },
    async edit(request, response) {
        try {
            const { cgc } = request.params;
            const searchCgc = String(cgc);
            const { userName } = request.body;
            const senhasRepository = typeorm_1.getRepository(Senha_1.default);
            const existSenha = await senhasRepository.findOne({
                where: {
                    tx_cgc: searchCgc
                }
            });
            if (existSenha === undefined) {
                return response.status(404).json({ "Erro": "Cadastro não Existe!" });
            }
            else {
                if (userName === '') {
                    return response.status(411).json({ "Erro": "Insira o Nome do Usuário." });
                }
                else {
                    existSenha.nm_nomecli = userName;
                    await senhasRepository.save(existSenha);
                    return response.status(200).json(existSenha);
                }
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async delete(request, response) {
        try {
            const { cgc } = request.params;
            const searchCgc = String(cgc);
            const senhasRepository = typeorm_1.getRepository(Senha_1.default);
            const existSenha = await senhasRepository.findOne({
                where: {
                    tx_cgc: searchCgc
                }
            });
            if (existSenha === undefined) {
                return response.status(404).json({ "Erro": "Usuário não Encontrado" });
            }
            else {
                await senhasRepository.remove(existSenha);
                return response.status(200);
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    },
    async create(request, response) {
        try {
            /* CRIAR NOVO USUÁRIO DA APLICAÇÃO
            VEM DO APP COMO { password, userCode, userName, cgc }
            SAI PARA O BANCO { tx_senha, cd_ccli, nm_nomecli, tx_cgc }
      
            NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS
            RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
            */
            const { secret, userCode, userName, cgc } = request.body;
            console.log(secret);
            if (secret === credentials_3.SegundaSenha) {
                if (userCode === '' || userName === '' || cgc === '') {
                    return response.status(400).json({ "Erro": "O parâmetro não pode ser vazio." });
                }
                else {
                    const senhasRepository = typeorm_1.getRepository(Senha_1.default);
                    const existSenha = await senhasRepository.findOne({
                        where: {
                            tx_cgc: cgc
                        }
                    });
                    if (existSenha === undefined) {
                        const saltEncriypted = await bcrypt_1.default.genSalt(credentials_1.salt);
                        const hash = await bcrypt_1.default.hash(cgc, saltEncriypted);
                        const data = {
                            in_ativo: 0,
                            tx_senha: hash,
                            cd_ccli: userCode,
                            nm_nomecli: userName,
                            tx_cgc: cgc
                        };
                        const schema = Yup.object().shape({
                            in_ativo: Yup.number().required(),
                            tx_senha: Yup.string().required(),
                            cd_ccli: Yup.string().required(),
                            nm_nomecli: Yup.string().required(),
                            tx_cgc: Yup.string().required()
                        });
                        await schema.validate(data, {
                            abortEarly: false,
                        });
                        const senhaRepository = await senhasRepository.insert(data);
                        return response.status(201).json(senhaRepository);
                    }
                    else {
                        return response.status(409).json({ "Ops!": "CPF já Cadastrado." });
                    }
                }
            }
            else {
                return response.status(400).json({ "Erro": "Código Errado." });
            }
        }
        catch (err) {
            return response.status(400).json({ "Erro": err });
        }
    }
};
