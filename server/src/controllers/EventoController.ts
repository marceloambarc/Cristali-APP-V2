import { Request, Response } from "express";
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Between, getRepository } from "typeorm";
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

      var { dtInicio, dtFim } = request.body;
      const parsedInicio = parseISO(dtInicio);
      const parsedFim = parseISO(dtFim);

      if(dtInicio == undefined && dtFim == undefined ||
        dtInicio == "" && dtFim == ""){
        return response.status(400).json({ "Erro": "JSON incorreto" });
      }

      let findArgs = { 
        where:{
          dt_evento: Between(startOfDay(parsedInicio).toISOString(), endOfDay(parsedFim).toISOString()),
        }
      };

      const eventsRepository = getRepository(Evento);

      const events = await eventsRepository.find(findArgs);

      if(events.length === 0){
        return response.status(404).json({ "Vazio": "Nenhum Evento Cadastrado" });
      }else{
        return response.json(eventView.renderMany(events));
      }

    }catch(err){
      return response.status(400).json({ "Erro": err });
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

      const half = Math.ceil(userToken.length / 2);
      const firstHalf = userToken.substr(0, half);
      const secondHalf = userToken.substr(-half);

      const eventsRepository = getRepository(Evento);

      const data : any = {
        dt_evento: new Date(),
        cd_ccli: userCode,
        tx_evento: eventDescription,
        token_cliente: firstHalf,
        token_celular: secondHalf
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
      console.log(err);
      return response.status(400).json({ "Erro": err });
    }
  },
}