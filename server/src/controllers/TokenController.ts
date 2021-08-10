import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
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
      return response.status(200).json([tokenView.renderMany(tokens), request.userId]);
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

      /* CRIAR NOVO TOKEN DE DISPOSITIVO FÍSICO PARA 
      GERENCIAMENTO DE EVETOS E NOTIFICAÇÕES
      VEM DO APP COMO { id, deviceToken, createdAt, updatedAt }
      SAI PARA O BANCO { id, token_celular, dt_criado, dt_modificado }

      NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS 
      RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
      */

      const {
        deviceToken
      } = request.body;

      const tokensRepository = getRepository(Token);

      const existToken = await tokensRepository.findOne({
        where: [
          { token_celular: deviceToken }
        ]
      });

      if(!existToken && existToken !== ''){

        const data: any = {
          token_celular: deviceToken,
          dt_criado: new Date(),
          dt_modificado: new Date()
        };
    
        const schema = Yup.object().shape({
          token_celular: Yup.string().required(),
          dt_criado: Yup.date().required(),
          dt_modificado: Yup.date().required(),
        });
    
        await schema.validate(data, {
            abortEarly: false,
        });
    
        const tokenRepository = tokensRepository.create(data);

        await tokensRepository.save(tokenRepository);

        return response.status(201).json(tokenRepository);
      }else{
        return response.status(409).json({ "Ops!" : "Token já Cadastrado" });
      }

    }catch(err){
      return response.status(400).json({ "Erro": err });
    }
  }

}