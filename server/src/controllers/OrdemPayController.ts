import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup'

import OrdemPagamento from "../models/Ordempagamento";
import ordempagamentoView from "../view/ordempagamento_view";

export default {

  async show(request: Request, response: Response) {
    const { doc } = request.params;

    const ordensRepository = getRepository(OrdemPagamento);

    const ordem = await ordensRepository.findOne({
      where: {
        code_doc: doc
      }
    });

    if(ordem === undefined){
      return response.status(204).json({ "Vazio" : "Nenhuma Ordem Cadastrada." });
    }else{
      return response.json(ordempagamentoView.render(ordem));
    }
  },

  async create(request: Request, response: Response) {
    try {

      const {
        condition,
        totalPrice,
        clientToken,
        codeDoc,
        orderId
      } = request.body

      const ordensRepository = getRepository(OrdemPagamento);

      const data : any = {
        cd_habil_tipo: condition,
        dt_evento: new Date(),
        dt_retorno: new Date(0),
        vl_total: totalPrice,
        token_cliente: clientToken,
        code_doc: codeDoc,
        ordem_pagamento: orderId
      };

      const schema = Yup.object().shape({
        cd_habil_tipo: Yup.string().required(),
        dt_evento: Yup.date().default(() => new Date()),
        dt_retorno: Yup.date().default(() => new Date(0)),
        vl_total: Yup.string().required(),
        token_cliente: Yup.string().required(),
        code_doc: Yup.string().required(),
        ordem_pagamento: Yup.number().required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const ordemRepository = ordensRepository.create(data);

      await ordensRepository.save(ordemRepository);

      return response.status(201).json(ordemRepository);

    } catch(err) {
      return response.status(400).json({ 'Erro' : err });
    }
  }
}