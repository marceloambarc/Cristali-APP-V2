import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup'

import Ordem from "../models/Ordem";
import ordemView from "../view/ordem_view";

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

      console.log(id);
  
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
      } = request.body;

      const ordensRepository = getRepository(Ordem);

      const data : any = {
        cd_id_ccli: userCode,
        dt_criado: new Date(),
        vl_total: totalPrice,
        tx_obs: orderNotes,
        cd_habil_tipo: 0
      };

      const schema = Yup.object().shape({
        cd_id_ccli: Yup.string().required(),
        dt_criado: Yup.date().default(() => new Date()),
        vl_total: Yup.string().required(),
        tx_obs: Yup.string().required(),
        cd_habil_tipo: Yup.number().required()
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const ordemRepository = ordensRepository.create(data);

      await ordensRepository.save(ordemRepository);

      return response.status(201).json(ordemRepository);

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  }

}