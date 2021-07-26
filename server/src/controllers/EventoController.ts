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

      const { 
        userCode,
        eventDescription,
        userToken,
        deviceToken
      } = request.body;

      const eventsRepository = getRepository(Evento);

      const data : any = {
        createdAt: new Date(),
        userCode,
        eventDescription,
        userToken,
        deviceToken,
      };

      const schema = Yup.object().shape({
        createdAt: Yup.date().default(() => new Date()),
        userCode: Yup.string().required(),
        eventDescription: Yup.string().required(),
        userToken: Yup.string().required(),
        deviceToken: Yup.string().required()
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