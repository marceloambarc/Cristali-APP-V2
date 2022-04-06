import { Request, Response } from "express";
import { Between, getRepository, LessThan, LessThanOrEqual, MoreThan, In } from "typeorm";
import * as Yup from 'yup'

import OrdemReserva from "../models/OrdemReserva";
import OrdemReservaView from "../view/ordemreserva_view";

import Clientefinal from "../models/ClienteFinal";
import ClienteController from "./ClienteController";
import Ordem from "../models/Ordem";

export default {

  async index(request: Request, response: Response) {
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
  },

  async show(request: Request, response: Response) {
    try {

      const { id } = request.params;
  
      const ordensReservaRepository = getRepository(OrdemReserva)
  
      const ordensReserva = await ordensReservaRepository.findOne({
        where: {
          cd_id_ccli: id
        }
      });
  
      if(ordensReserva === undefined){
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Cadastrada neste Usuário" });
      }else{
        return response.json(OrdemReservaView.render(ordensReserva));
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
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
      return response.status(400).json({ "Erro" : err });
    }
  },

  async editCondition(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const { condition } = request.body;
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
        await ordensReservaRepository.save(existOrdemReserva);
        return response.status(200);
      }

    }catch(err){
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
      return response.status(400).json({ "Erro" : err });
    }
  },

  async create(request: Request, response: Response, codigo: number) {
    try {

      var { 
        userCode,
        totalPrice,
        orderNotes,
        client,
        itens
      } = request.body;

      if(orderNotes === undefined)
        orderNotes = 'Observação Não Inserida';

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
      return response.status(400);
    }
  },

}