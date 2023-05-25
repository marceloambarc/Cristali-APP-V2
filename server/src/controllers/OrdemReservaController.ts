import { Request, Response } from "express";
import { Between, getRepository, LessThan, LessThanOrEqual, MoreThan, In } from "typeorm";
import * as Yup from 'yup'

import OrdemReserva from "../models/OrdemReserva";
import OrdemReservaView from "../view/ordemreserva_view";

import Clientefinal from "../models/ClienteFinal";

export default {

  async index(request: Request, response: Response) {
    try {
      const ordensReservaRepository = getRepository(OrdemReserva)
      const ordensReserva = await ordensReservaRepository.find({
        order: {
          cd_id_ccli: "DESC"
        }
      });

      if(ordensReserva.length === 0){
        return response.status(204).json({ "Vazio" : "Nenhuma Ordem Cadastrada." });
      }else{
        return response.json(OrdemReservaView.renderMany(ordensReserva));
      }
    }catch(err){
      console.log("RES INDEX ERR :" + err);
    }
  },

  async show(request: Request, response: Response) {
    try {

      const { id } = request.params;
  
      const ordensReservaRepository = getRepository(OrdemReserva)
  
      const ordensReserva = await ordensReservaRepository.find({
        where: {
          cd_id_ccli: id
        }
      });
  
      if(ordensReserva === undefined){
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Cadastrada neste Usuário" });
      }else{
        return response.json(OrdemReservaView.renderMany(ordensReserva));
      }

    }catch(err){
      console.log("RES RENDER ERR :" + err);
      return response.status(400).json({ "Erro" : "Erro render reserva" });
    }
  },

  async showOpenSales(request: Request, response: Response) {
    try {

      const { userCode } = request.body;

      const ordensReservaRepository = getRepository(OrdemReserva);

      var openSales;

      if(userCode !== undefined) {
        openSales = await ordensReservaRepository.find({
          where: {
            cd_id_ccli: userCode,
            cd_habil_tipo : 217
          }
        });
      } else {
        openSales = await ordensReservaRepository.find({
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
          return response.json(OrdemReservaView.renderMany(openSales));
        }
      }

    }catch(err){
      console.log("RESOPEN ERR :" + err);
      return response.status(400).json({ "Erro" : "abertas reserva" });
    }
  },

  async editCondition(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const { condition, orderReference } = request.body;
      const setCondition = parseInt(condition);

      const ordensReservaRepository = getRepository(OrdemReserva);

      const existOrdemReserva = await ordensReservaRepository.findOne({
        where: {
          cd_id: id
        }
      });

      if(existOrdemReserva === undefined){
        return;
      } else {
        existOrdemReserva.cd_habil_tipo = setCondition;
        existOrdemReserva.tx_referencia = orderReference;
        await ordensReservaRepository.save(existOrdemReserva);
        return response.status(200);
      }

    }catch(err){
      console.log("RES CONDITION ERR :" + err);
      return response.status(400);
    }
  },

  async userOrders(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensReservaRepository = getRepository(OrdemReserva);

      const ordensReserva = await ordensReservaRepository.find({
        where: {
          cd_id_ccli: searchId
        },relations: ['itens']
      });

      if(ordensReserva.length === 0) {
        return response.status(204).json({ "Vazio" : "Nenhuma Ordem Cadastrada" });
      } else {
        return response.json(OrdemReservaView.renderManyWithItens(ordensReserva));
      }

    }catch(err) {
      console.log("RES-USER ORDER ERR :" + err);
      return response.status(400).json({ "Erro" : "Ordem-Reserva do Usuário" });
    }
  },

  async create(request: Request, response: Response, codigo: number) {
    try {

      var { 
        userCode,
        totalPrice,
        orderNotes,
        orderReference,
        client,
        itens
      } = request.body;

      let oderNotesChecked = "";

      if(orderNotes === undefined || orderNotes === ''){
        oderNotesChecked = 'Observação Não Inserida';
      }else{
        oderNotesChecked = orderNotes;
      }

      const ordensRepository = getRepository(OrdemReserva);

      const clientesRepository = getRepository(Clientefinal);

      const existCliente = await clientesRepository.findOne({
        where: {
          nm_nome: client.clientName
        }
      });

      if(existCliente != undefined) {

        const codPessoa = existCliente.cd_pessoa;
        const data : any = {
          cd_id: codigo,
          cd_id_ccli: userCode,
          dt_criado: new Date(),
          vl_total: totalPrice,
          tx_obs: oderNotesChecked,
          cd_habil_tipo: 217,
          cd_clientefinal: codPessoa,
          tx_referencia: orderReference,
          itens
        };

        const schema = Yup.object().shape({
          cd_id_ccli: Yup.string().required(),
          dt_criado: Yup.date().default(() => new Date()),
          vl_total: Yup.string().required(),
          tx_obs: Yup.string().required(),
          cd_habil_tipo: Yup.number().required(),
          cd_clientefinal: Yup.number().required(),
          tx_referencia: Yup.string().required(),
          itens: Yup.array(
            Yup.object().shape({
              id: Yup.number().strip(),
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
        return response.status(201);
      }else{
        return response.status(400);
      }
    } catch(err) {
      console.log("RES CREATE ERR :" + err);
      return response.status(400);
    }
  },

  async edit(request: Request, response: Response, codigo: number){
    try {

      var {
        totalPrice,
        orderNotes,
        itens,
        clientId,
        client,
        userCode
      } = request.body;

      if(orderNotes == '')
        orderNotes = 'Observação não inserida';

        itens.forEach((item, index, object) => {
          if(item.vl_preco === 0)
            object.splice(index, 1);
          if(item.vl_preco === '')
            object.splice(index, 1);
          if(item.cd_codigogerado === '')
            item.cd_codigogerado = 'Código Vazio';
          if(item.nm_produto === '')
            item.nm_produto = 'Nome Não Inserido';
          if(item.vl_preco)
            item.vl_preco = parseInt(String(item.vl_preco).replace(/\D/g, ""));
        });

      const ordensRepository = getRepository(OrdemReserva);

      const existOrdem = await ordensRepository.findOne({
        where: {
          cd_id: codigo
        }
      });

      if(existOrdem === undefined){
        return response.status(400);
      }else{
        existOrdem.vl_total = totalPrice;
        existOrdem.tx_obs = orderNotes;
        existOrdem.cd_habil_tipo = 217;
        existOrdem.itens = itens;
        existOrdem.cd_clientefinal = clientId;

        await ordensRepository.save(existOrdem);
        return response.status(201);
      }

    } catch(err) {
      console.log("RES EDIT ERR :" + err);
      return response.status(400);
    }
  },

}