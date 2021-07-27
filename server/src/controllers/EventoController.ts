import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import Evento from "../models/Evento";
import eventView from "../view/evento_view";

export default {

  async index(request: Request, response: Response) {
    const eventsRepository = getRepository(Evento);

    const events = await eventsRepository.find();

    if(events.length === 0){
      return response.status(204).json({ "Vazio": "Nenhum Evento Cadastrado" });
    }else{
      return response.json(eventView.renderMany(events));
    }
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const eventsRepository = getRepository(Evento);

    const event = await eventsRepository.findOneOrFail(id);

    return response.json(eventView.render(event));
  },

  async create(request: Request, response: Response) {
    try {
      /* CRIAR NOVO LOG DE EVENTOS
      VEM DO APP COMO { userCode, eventDescription, userToken, deviceToken }
      SAI PARA O BANCO { cd_ccli, tx_evento, token_cliente, token_celular }

      NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS 
      RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
      */

      const { 
        userCode,
        eventDescription,
        userToken,
        deviceToken
      } = request.body;

      const eventsRepository = getRepository(Evento);

      const data : any = {
        dt_evento: new Date(),
        cd_ccli: userCode,
        tx_evento: eventDescription,
        token_cliente: userToken,
        token_celular: deviceToken,
      };

      const schema = Yup.object().shape({
        dt_evento: Yup.date().default(() => new Date()),
        cd_ccli: Yup.string().required(),
        tx_evento: Yup.string().required(),
        token_cliente: Yup.string().required(),
        token_celular: Yup.string().required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const eventRepository = eventsRepository.create(data);

      await eventsRepository.save(eventRepository);

      return response.status(201).json(eventRepository);

    }catch(err){
      return response.status(400).json({ "Erro": err });
    }
  }

}