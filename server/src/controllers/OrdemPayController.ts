import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup'

import Ordem from "../models/Ordem";
import ordemView from "../view/ordem_view";

export default {

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const searchId = parseInt(id);

    const ordensRepository = getRepository(Ordem);

    const ordem = await ordensRepository.findOne({
      where: {
        cd_id_ccli: searchId
      },
      relations: ['ordem_pagamento']
    });

    if(ordem === undefined){
      return response.status(204).json({ "Vazio" : "Nenhuma Ordem Cadastrada." });
    }else{
      return response.json(ordemView.renderPayment(ordem));
    }
  },

}