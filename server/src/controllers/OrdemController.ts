import { Request, Response } from "express";
import { getRepository, LessThan, LessThanOrEqual, MoreThan } from "typeorm";
import { createHash } from 'crypto';
import * as Yup from 'yup'

import { pagSegurotoken } from "../../credentials";

import Ordem from "../models/Ordem";
import ordemView from "../view/ordem_view";

import Clientefinal from "../models/Clientefinal";
import ClienteController from "./ClienteController";


export default { 

  async index(request: Request, response: Response) {
    const ordensRepository = getRepository(Ordem);

    const ordens = await ordensRepository.find();

    if(ordens.length === 0){
      return response.status(204).json({ "Vazio" : "Nenhuma Ordem Cadastrada." });
    }else{
      return response.json(ordemView.renderMany(ordens));
    }
  },

  async show(request: Request, response: Response) {
    try {

      const { id } = request.params;
  
      const ordensRepository = getRepository(Ordem);
  
      const ordem = await ordensRepository.findOne({
        where: {
          cd_id_ccli: id
        }
      });
  
      if(ordem === undefined){
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Cadastrada neste Usuário" });
      }else{
        return response.json(ordemView.render(ordem));
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async showOpenSales(request: Request, response: Response) {
    try {

      const { userCode } = request.body;

      const ordensRepository = getRepository(Ordem);

      var openSales;

      if(userCode !== undefined) {
        openSales = await ordensRepository.find({
          where: {
            cd_id_ccli: userCode,
            cd_habil_tipo : 217
          }
        });
      } else {
        openSales = await ordensRepository.find({
          where: {
            cd_habil_tipo : 217
          }
        });
      }

      if(openSales === undefined) {
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Aberta" });
      } else {
        if(openSales.length <= 0){
          return response.status(204).json({ "Vazio" : "Nenhuma Ordem Aberta" });
        } else {
          return response.json(ordemView.renderMany(openSales));
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async showInsertedSales(request: Request, response: Response) {
    try {

      const { userCode } = request.body;

      const ordensRepository = getRepository(Ordem);

      var insertedSales;

      if(userCode !== undefined) {
        insertedSales = await ordensRepository.find({
          where: {
            cd_id_ccli: userCode,
            cd_habil_tipo : 218
          }
        });
      } else {
        insertedSales = await ordensRepository.find({
          where: {
            cd_habil_tipo : 218
          }
        });
      }

      if(insertedSales === undefined) {
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Aberta" });
      } else {
        if(insertedSales.length <= 0){
          return response.status(204).json({ "Vazio" : "Nenhuma Ordem Aberta" });
        } else {
          return response.json(ordemView.renderMany(insertedSales));
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },
  
  async showSelectedPaymentSales(request: Request, response: Response) {
    try {

      const { userCode } = request.body;

      const ordensRepository = getRepository(Ordem);

      var selectedPaymentOrdem;

      if(userCode !== undefined) {
        selectedPaymentOrdem = await ordensRepository.find({
          where: {
            cd_id_ccli: userCode,
            cd_habil_tipo : 219
          }
        });
      } else {
        selectedPaymentOrdem = await ordensRepository.find({
          where: {
            cd_habil_tipo : 219
          }
        });        
      }

      if(selectedPaymentOrdem === undefined) {
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Aberta" });
      } else {
        if(selectedPaymentOrdem.length <= 0){
          return response.status(204).json({ "Vazio" : "Nenhuma Ordem Aberta" });
        } else {
          return response.json(ordemView.renderMany(selectedPaymentOrdem));
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async edit(request: Request, response: Response) {
    try {

      const { id } = request.params;

      const {
        totalPrice,
        orderNotes
       } = request.body;

       const ordensRepository = getRepository(Ordem);

       const existOrdem = await ordensRepository.findOne({
        where: {
          cd_id: id
        }
      });

      if(existOrdem === undefined){
        return response.status(404).json({ "Erro" : "Ordem não Existe." });
      }else{
        existOrdem.vl_total = totalPrice;
        existOrdem.tx_obs = orderNotes;
        await ordensRepository.save(existOrdem);
        return response.status(200).json(existOrdem);
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async editCondition(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const { condition } = request.body;
      const setCondition = parseInt(condition);

      const ordensRepository = getRepository(Ordem);

      const existOrdem = await ordensRepository.findOne({
        where: {
          cd_id: id
        }
      });

      if(existOrdem === undefined){
        return response.json(404).json({ "Erro" : "Ordem não Econtrada" });
      }else{
        existOrdem.cd_habil_tipo = setCondition;
        await ordensRepository.save(existOrdem);
        return response.status(200).json(existOrdem);
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const ordensRepository = getRepository(Ordem);

    const existOrdem = await ordensRepository.findOne({
      where: { cd_id : id }
    });

    if(existOrdem === undefined){
      return response.status(404).json({ "Erro" : "Ordem não encontrada." });
    }else{
      const deletedOrdem = await ordensRepository.delete(existOrdem);
      if(deletedOrdem === undefined){
        return response.status(400).json({ "Erro" : "Tivemos um erro ao Deletar Ordem" });
      }else{
        return response.status(200).json({ "OK!" : "Ordem Deletada com Sucesso!" });
      }
    }
  },

  async create(request: Request, response: Response) {
    try {
      /* CRIAR NOVA ORDEM DE VENDA 
        VEM DO APP { userCode, createdAt, totalPrice, orderNotes, condition }
        VAI PARA O BANCO { cd_id_ccli, dt_criado, vl_total, tx_obs, cd_habil_tipo }
      */
      
      const { 
        userCode,
        totalPrice,
        orderNotes,
        client,
        itens
      } = request.body;

      const ordensRepository = getRepository(Ordem);

      const clientesRepository = getRepository(Clientefinal);

      const existCliente = await clientesRepository.findOne({
        where: {
          nm_nome: client.clientName
        }
      });

      if(existCliente != undefined) {
        const codPessoa = existCliente.cd_pessoa;
        const data : any = {
          cd_id_ccli: userCode,
          dt_criado: new Date(),
          vl_total: totalPrice,
          tx_obs: orderNotes,
          cd_habil_tipo: 217,
          cd_clientefinal: codPessoa,
          itens,
        };

        const schema = Yup.object().shape({
          cd_id_ccli: Yup.string().required(),
          dt_criado: Yup.date().default(() => new Date()),
          vl_total: Yup.string().required(),
          tx_obs: Yup.string().required(),
          cd_habil_tipo: Yup.number().required(),
          cd_clientefinal: Yup.number().required(),
          itens: Yup.array(
            Yup.object().shape({
              nm_produto: Yup.string().nullable(),
              cd_codigogerado: Yup.string().required(),
              vl_preco: Yup.string().required()
            })
          )
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const ordemRepository = ordensRepository.create(data);

        await ordensRepository.save(ordemRepository);

        return response.status(201).json(ordemRepository);
      } else {
        // CRIAR NOVO CLIENTE E SALVAR ORDEM
        const clienteData : any = {
          nm_nome: client.clientName,
          tx_fone: client.clientPhone,
          tx_email: client.clientEmail,
          tx_obs: client.clientNotes,
          cd_id_ccli: userCode,
          cd_ordem_id: 1
        }

        const createCliente = await ClienteController.create(request, response, clienteData);

        if(createCliente != undefined){
          if(createCliente.statusCode === 201) {

            const existClienteCreated = await clientesRepository.findOne({
              where: {
                nm_nome: client.clientName
              }
            });
            const responseClienteId = existClienteCreated?.cd_pessoa;

            const data : any = {
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
              itens: Yup.array(
                Yup.object().shape({
                  nm_produto: Yup.string().nullable(),
                  cd_codigogerado: Yup.string().required(),
                  vl_preco: Yup.number().required()
                })
              )
            });

            await schema.validate(data, {
              abortEarly: false,
            });

            const ordemRepository = ordensRepository.create(data);

            await ordensRepository.save(ordemRepository);

            return response.json(ordemRepository);
          } else {
            return response.status(createCliente.statusCode).json(createCliente.json);
          }
        } else {
          return;
        }
      }
      

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  //  MYCLIENTS

  async userOrders(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      const ordens = await ordensRepository.find({
        where: {
          cd_id_ccli: searchId
        },relations: ['itens']
      });

      if(ordens.length === 0) {
        return response.status(204).json({ "Vazio" : "Nenhuma Ordem Cadastrada" });
      } else {
        return response.json(ordemView.renderManyWithItens(ordens));
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async userSavedOrders(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      const ordens = await ordensRepository.find({
        where: [
          { cd_id_ccli: searchId, cd_habil_tipo: LessThanOrEqual(219) },
        ]
      });

      if(ordens.length === 0) {
        return response.status(204).json({ "Vazio" : "Nenhuma Ordem Salva" });
      } else {
        return response.json(ordemView.renderMany(ordens));
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async userHystory(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      const ordens = await ordensRepository.find({
        where: [
          { cd_id_ccli: searchId, cd_habil_tipo: MoreThan(219) },
        ]
      });

      if(ordens.length === 0) {
        return response.status(204).json({ "Vazio" : "Histórico Vazio" });
      } else {
        return response.json(ordemView.renderMany(ordens));
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async deleteUserHistory(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      var d = new Date();
      d.setDate(d.getDate()-30);

      const ordens = await ordensRepository.find({
        where: [
          { cd_id_ccli: searchId },
          { dt_criado: LessThan(d) }
        ]
      });

      if(ordens.length !== 0){
        await ordensRepository.remove(ordens);

        return response.status(200);
      }

      return;

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async pSeguro(request: Request, response: Response) {
    try {

      const payload = request.body;
      const header = request.headers;

      const hash = createHash("sha256").update(`${payload}-${pagSegurotoken}`).digest('hex')

    }catch(err) {
      return response.status(400).json({ "Erro": err });
    }
  }
}