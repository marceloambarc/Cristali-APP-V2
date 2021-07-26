import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import { salt } from '../../credentials';
import { JWTSecret } from '../../credentials';

import Senha from '../models/Senha';
import senhaView from '../view/senha_view';

export default {
  
  async index(request: Request, response: Response) {
    const senhasRepository = getRepository(Senha);

    const senhas = await senhasRepository.find()

    if(senhas.length === 0){
      return response.status(204).json({ "Vazio" : "Nenhum Usuário Cadastrado." });
    }else{
      return response.json(senhaView.renderMany(senhas));
    }
  },

  async login(request: Request, response: Response) {
    const { cgc, password } = request.body;

    const senhasRepository = getRepository(Senha);

    const senha = await senhasRepository.findOne({ "tx_cgc": cgc });

    if(senha === undefined){
      return response.status(403).send({ "Erro" : "Usuário não Cadastrado" });
    }else{
      const isPasswordRight = await bcrypt.compare(password, senha.tx_senha);

      if(!isPasswordRight){
        return response.status(419).json({ "Erro": "Senha Incorreta" });
      }else{
        jwt.sign({ cgc, id: senha.id, isActive: senha.in_ativo, userName: senha.nm_nomecli }, JWTSecret, { expiresIn: '1h' }, (err, token) => {
          if(err){
            return response.status(401).json({ "Ops": "A sua Sessão Terminou, Faça Login Novamente" });
          }else{
            return response.status(200).json({ "token": token, "user": senhaView.render(senha) });
          }
        })
      }
    }
  },

  async switch(request: Request, response: Response) {
    try {
      
      const { cgc } = request.params;
      const { isActive } = request.body;
      const setIsActive = parseInt(isActive);

      const senhasRepository = getRepository(Senha);

      const existSenha = await senhasRepository.findOne({
        where: [
          { TX_CGC: cgc }
        ]
      });

      if(existSenha != undefined){
        const editedSenha = await senhasRepository.update(existSenha, { "in_ativo": setIsActive  });
        if(editedSenha){
          return response.status(202).json(senhaView.render(existSenha));
        }else{
          return response.status(400).json({ "Erro": "Não foi possível editar Usuário." });
        }
      }else{
        return response.status(404).json({ "Erro": "Usuário não Encontrado." });
      }

    }catch(err){
      return response.status(400).json({ err });
    }
  }

}