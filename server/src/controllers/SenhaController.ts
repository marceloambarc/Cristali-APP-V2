import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import { salt } from '../../credentials';
import { JWTSecretUser, SegundaSenha, versionCodeAndroid, versionCodeiOS } from '../../credentials';

import Senha from '../models/Senha';
import senhaView from '../view/senha_view';

export default {
  
  async index(request: Request, response: Response) {
    const senhasRepository = getRepository(Senha);

    const senhas = await senhasRepository.find()

    if(senhas.length === 0){
      return response.status(204).json({ "Vazio" : "Nenhum Usuário Cadastrado." });
    }else{
      return response.json(senhaView.renderMany(senhas));
    }
  },

  async show(request: Request, response: Response) {
    try {
      const { 
        cgc
      } = request.params;
      const searchCgc = String(cgc);
  
      const senhasRepository = getRepository(Senha);
  
      const existSenha = await senhasRepository.findOne(
        {
          where: {
            tx_cgc: searchCgc
          }
        }
      );

      if(existSenha != undefined) {
        return response.json(senhaView.render(existSenha));
      } else {
        return response.status(404).json({"Erro" : "Nenhum usuário cadastrado"});
      }

      

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async login(request: Request, response: Response) {
    let { cgc, password, versionMobile, mobileUsed } = request.body;

    if(versionMobile == undefined){
      versionMobile = "1.0.0";
      mobileUsed = "1";
    }

    const senhasRepository = getRepository(Senha);
    const senha = await senhasRepository.findOne({ "tx_cgc": cgc });

    if(versionMobile == "admin"){
      versionMobile = senha?.tx_versao_android;
      mobileUsed = "0";
    }

    if(senha === undefined){
      return response.status(403).send({ "Erro" : "Usuário não Cadastrado" });
    }else{
      const isPasswordRight = await bcrypt.compare(password, senha.tx_senha);

      if(!isPasswordRight){
        return response.status(419).json({ "Erro": "Senha Incorreta" });
      }else{
        if(senha.in_ativo === 0){
          return response.status(406).json({ "Erro": "Usuário não ativo." });
        } else {

          //VERIFICAR SISTEMA USADO
          //COMPARAR SISTEMA COM O BANCO.

          let versionDatabase;
          let versionMobileInt;
          let txVersaoAny : any;

          if(mobileUsed > 0){
            //IOS - Padrão de versão 0.0.0
            txVersaoAny = senha.tx_versao_ios;
			      let re = /\./gi;
			
            versionMobileInt = parseInt(versionMobile.replace(re, ''));

            if(txVersaoAny != " ")
              versionDatabase = parseInt(txVersaoAny.replace(re, ''));
          }else{
            // Android - Padrão de versão 000
            txVersaoAny = senha.tx_versao_android;
            versionMobileInt = parseInt(versionMobile);

            if(txVersaoAny != " ")
              versionDatabase = parseInt(txVersaoAny);
          }

          
          if(versionDatabase > versionMobileInt && txVersaoAny != " "){
            return response.status(426).json({ "Erro": "Necessário Update." });
          }else{
            jwt.sign({ cgc, id: senha.id, isActive: senha.in_ativo, userName: senha.nm_nomecli }, JWTSecretUser, { expiresIn: '1h' }, async (err, token) => {
              if(err){
                return response.status(401).json({ "Ops": "A sua Sessão Terminou, Faça Login Novamente" });
              }else{
                //ATUALIZAR VERSÃO NO BANCO
                
                if(mobileUsed > 0)
                  senha.tx_versao_ios = versionMobile;
                else
                  senha.tx_versao_android = versionMobile;

                await senhasRepository.save(senha);

                return response.status(200).json({ "token": token, "user": senhaView.render(senha) });
              }
            })
          }
        }
      }
    }
  },

  async hashPasswords(request: Request, response: Response) {
    try {

      const { password } = request.body;

      const senhasRepository = getRepository(Senha);
  
      const senha = await senhasRepository.find();
  
      if(password === SegundaSenha) {
        senha.forEach(async user => {
          let password = user.tx_senha;
          let generatedSalt = await bcrypt.genSalt(salt);
          let hash = await bcrypt.hash(password,generatedSalt);

          user.tx_senha = hash;
          await senhasRepository.save(user);
        });
        return response.status(200).json({ "OK!" : "Senhas criptografadas." });
      }
    }catch(err){
      return response.status(401).json({ "Senha Incorreta" : "Entre em contato com o Suporte" });
    }
  },

  async updateVersion(request: Request, response: Response) {
    try {

      const { secret, versionMobile, mobileUsed } = request.body;

      console.log(request.body);

      if(secret === SegundaSenha) {
        const senhasRepository = getRepository(Senha);
  
        const senha = await senhasRepository.find();

        senha.forEach(async user => {

          if(mobileUsed > 0)
            user.tx_versao_ios = versionMobile;
          else
            user.tx_versao_android = versionMobile;

          await senhasRepository.save(user);
        });
        return response.status(200).json({ "OK!" : "Versão Atualizada." });

      } else {
        return response.status(400).json({ "Erro" : "Código Errado." });
      }
    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async resetPassword(request: Request, response: Response) {
    try {

      const {
        secret,
        userCgc
      } = request.body;

      if(secret === SegundaSenha) {
        const searchUserCgc = String(userCgc);

        const senhasRepository = getRepository(Senha);
  
        const existSenha = await senhasRepository.findOne({
          where: {
            tx_cgc: searchUserCgc
          }
        });
  
        if(existSenha === undefined) {
          return response.status(404).json({ "Erro" : "Usuário não existe" });
          
        } else {
          const newPassword = userCgc;
          let generatedSalt = await bcrypt.genSalt(salt);
          let hash = await bcrypt.hash(newPassword, generatedSalt);
  
          existSenha.tx_senha = hash;
          await senhasRepository.save(existSenha);
  
          return response.status(202).json(senhaView.render(existSenha));
        }
      } else {
        return response.status(400).json({ "Erro" : "Código Errado." });
      }
    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async changePassword(request: Request, response: Response) {
    try {

      const {
        userCode,
        oldPassword,
        newPassword
      } = request.body;

      const searchUserCode = String(userCode);

      const senhasRepository = getRepository(Senha);

      const existSenha = await senhasRepository.findOne({
        where: {
          cd_ccli: searchUserCode
        }
      });

      if(existSenha === undefined) {
        return response.status(404).json({ "Erro" : "Usuário não existe" });
        
      } else {
        const isPasswordRight = await bcrypt.compare(oldPassword, existSenha.tx_senha);

        if(!isPasswordRight) {
          return response.status(419).json({ "Erro": `Senha Atual Incorreta ${existSenha.nm_nomecli}` });
        } else {
          let generatedSalt = await bcrypt.genSalt(salt);
          let hash = await bcrypt.hash(newPassword, generatedSalt);

          existSenha.tx_senha = hash;
          await senhasRepository.save(existSenha);

          return response.status(202).json(senhaView.render(existSenha));
        }
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async switch(request: Request, response: Response) {
    try {
      const { isActive, cgc, secret } = request.body;
      const setIsActive = parseInt(isActive);

      if(secret !== SegundaSenha){
        return response.status(404).json({ "Erro": "Código Errado." });
      }

      const senhasRepository = getRepository(Senha);

      const existSenha = await senhasRepository.findOne({
        where: [
          { tx_cgc: cgc }
        ]
      });

      if(existSenha != undefined){
        const editedSenha = await senhasRepository.update(existSenha, { "in_ativo": setIsActive  });
        if(editedSenha){
          return response.status(202).json(senhaView.render(existSenha));
        }else {
          return response.status(400).json({ "Erro": "Não foi possível editar Usuário." });
        }
      }else {
        return response.status(404).json({ "Erro": "Usuário não Encontrado." });
      }
    }catch(err){
      return response.status(400).json({ err });
    }
  },

  async edit(request: Request, response: Response) {
    try {

      const {
        cgc
      } = request.params;
      const searchCgc = String(cgc);

      const {
        userName
      } = request.body;

      const senhasRepository = getRepository(Senha);

      const existSenha = await senhasRepository.findOne({
        where: {
          tx_cgc: searchCgc
        }
      });

      if(existSenha === undefined) {
        return response.status(404).json({ "Erro" : "Cadastro não Existe!" });
      } else {
        if(userName === '') {
          return response.status(411).json({ "Erro" : "Insira o Nome do Usuário." });
        } else {
          existSenha.nm_nomecli = userName;
          await senhasRepository.save(existSenha);
          return response.status(200).json(existSenha);
        }
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const {
        cgc
      } = request.params;
      const searchCgc = String(cgc);

      const senhasRepository = getRepository(Senha);

      const existSenha = await senhasRepository.findOne({
        where: {
          tx_cgc: searchCgc
        }
      });

      if(existSenha === undefined) {
        return response.status(404).json({ "Erro" : "Usuário não Encontrado" });
      } else {
        await senhasRepository.remove(existSenha);

        return response.status(200);
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async create(request: Request, response: Response) {
    try {
      /* CRIAR NOVO USUÁRIO DA APLICAÇÃO
      VEM DO APP COMO { password, userCode, userName, cgc }
      SAI PARA O BANCO { tx_senha, cd_ccli, nm_nomecli, tx_cgc }

      NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS 
      RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
      */
      const {
        secret,
        userCode,
        userName,
        cgc
      } = request.body;

      if(secret === SegundaSenha) {
        if(userCode === '' || userName === '' || cgc === '') {
          return response.status(400).json({ "Erro" : "O parâmetro não pode ser vazio." });
        } else {
  
          const senhasRepository = getRepository(Senha);
  
          const existSenha = await senhasRepository.findOne({
            where: {
              tx_cgc: cgc
            }
          });
    
          if(existSenha === undefined) {
            
            const saltEncriypted = await bcrypt.genSalt(salt);
            const hash = await bcrypt.hash(cgc, saltEncriypted);
    
            const data : any = {
              in_ativo: 0,
              tx_senha: hash,
              cd_ccli: userCode,
              nm_nomecli: userName,
              tx_cgc: cgc,
              tx_versao_android: versionCodeAndroid,
              tx_versao_ios: versionCodeiOS
            };
  
            const schema = Yup.object().shape({
              in_ativo: Yup.number().required(),
              tx_senha: Yup.string().required(),
              cd_ccli: Yup.string().required(),
              nm_nomecli: Yup.string().required(),
              tx_cgc: Yup.string().required(),
              tx_versao_android: Yup.string().required(),
              tx_versao_ios: Yup.string().required()
            });
      
            await schema.validate(data, {
              abortEarly: false,
            });
      
            const senhaRepository = await senhasRepository.insert(data);
    
            return response.status(201).json(senhaRepository);
  
          } else {
            return response.status(409).json({ "Ops!" : "CPF já Cadastrado." });
          }
        }
      } else {
        return response.status(400).json({ "Erro" : "Código Errado." });
      }
    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  }
}