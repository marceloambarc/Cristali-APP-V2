import { Request, Response } from "express";
import { Between, getRepository } from "typeorm";
import { convertCompilerOptionsFromJson } from "typescript";
import * as Yup from 'yup';

import Evento from "../models/Evento";
import eventView from "../view/evento_view";

export default {

  async index(request: Request, response: Response) {
    const eventsRepository = getRepository(Evento);

    const events = await eventsRepository.find();

    if(events.length === 0){
      return response.status(404).json({ "Vazio": "Nenhum Evento Cadastrado" });
    }else{
      return response.json(eventView.renderMany(events));
    }
  },

  async show(request: Request, response: Response) {
    try{

      const { id } = request.params;

      const eventsRepository = getRepository(Evento);
  
      const event = await eventsRepository.findOneOrFail(id);
  
      return response.json(eventView.render(event));

    }catch(err){
      return response.status(400).json({ "Erro": err });
    }
  },

  async showWithDt(request: Request, response: Response) {
    try{

      const { dtInicio, dtFim, dt } = request.body;

      var dtInt = parseInt(dt);
      var events = {} as Evento[];

      if(dtInicio == undefined && dtFim == undefined ||
        dtInicio == "" && dtFim == ""){
        return response.status(400).json({ "Erro": "JSON incorreto" });
      }

      const eventsRepository = getRepository(Evento);

      if(dtInt > 0){
        events = await eventsRepository.find({
          where: {
            dt_evento: Between(dtInicio, dtFim)
          },
          take: parseInt(dt)
        });
      }else{
        events = await eventsRepository.find({
          where: {
            dt_evento: Between(dtInicio, dtFim)
          }
        });
      }

      if(events.length === 0){
        return response.status(404).json({ "Vazio": "Nenhum Evento Cadastrado" });
      }else{
        return response.json(eventView.renderMany(events));
      }

    }catch{
      return response.status(510);
    }
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