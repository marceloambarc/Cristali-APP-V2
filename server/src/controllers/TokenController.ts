import { Request, Response } from 'express';
import { DeepPartial, getRepository } from 'typeorm';
import * as Yup from 'yup';

import Token from '../models/Token';
import tokenView from '../view/token_view';

export default {
  
  async index(request: Request, response: Response) {
    const tokensRepository = getRepository(Token);

    const tokens = await tokensRepository.find();

    if(tokens.length === 0){
      return response.status(204).json({ "Vazio": "Nenhum Token Inserido." });
    }else{
      return response.status(200).json(tokenView.renderMany(tokens));
    }
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const searchId = parseInt(id);

    const tokensRepository = getRepository(Token);

    const token = await tokensRepository.findOneOrFail(searchId);

    if(token){
      return response.json(tokenView.render(token));
    }else{
      return response.status(404);
    }
  },

  async create(request: Request, response: Response) {
    try {

      const {
        deviceToken
      } = request.body;

      const tokensRepository = getRepository(Token);

      const existToken = await tokensRepository.findOne({
        where: [
          { deviceToken: deviceToken }
        ]
      });

      if(!existToken && existToken !== ''){
        const data: any = {
          deviceToken,
          createdAt: new Date(),
          updatedAt: new Date()
        };
    
        const schema = Yup.object().shape({
            deviceToken: Yup.string().required(),
            createAt: Yup.date().default(() => new Date()),
            updateAt: Yup.date().default(() => new Date()),
          });
    
        await schema.validate(data, {
            abortEarly: false,
        });
    
        const tokenRepository = tokensRepository.create(data);

        await tokensRepository.save(tokenRepository);

        return response.status(201).json(tokenRepository);
      }else{
        return response.status(409).json();
      }

    }catch(err){
      return response.status(400).json();
    }
  }

}