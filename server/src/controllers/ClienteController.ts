import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import Clientefinal from "../models/ClienteFinal";
import clienteView from "../view/cliente_view";

export default {

  async index(request: Request, response: Response) {
    try {
      const clientesFinalRepository = getRepository(Clientefinal);

      const clientesFinal = await clientesFinalRepository.find();

      if(clientesFinal.length === 0){
        return response.status(204).json({ "Vazio": "Nenhum Cliente Final Cadastrado" });
      }else{
        return response.json(clienteView.renderMany(clientesFinal));
      }
    }catch(err){
      console.log("CLIENT INDEX ERR :" + err);
      return response.status(400).json({ "Erro" : "Erro de index" });
    }
  },

  async show(request: Request, response: Response) {  
    try {

      const { id } = request.params;
      const searchId = parseInt(id);
  
      const clientesFinalRepository = getRepository(Clientefinal);
  
      const cliente = await clientesFinalRepository.findOneOrFail(searchId);
  
      return response.json(clienteView.render(cliente));

    }catch(err){
      console.log("CLIENT RENDER ERR :" + err);
      return response.status(404).json({ "Erro" : "Nenhum Cliente encontrado com este Parâmetro." });
    }
  },

  async showWithOrders(request: Request, response: Response) {
    try {
      const { clientName } = request.body;
      const clientesFinalRepository = getRepository(Clientefinal);

      const existCliente = await clientesFinalRepository.findOne({
        where: [
          { nm_nome: clientName }
        ]
      });

      if(existCliente === undefined){
        return response.status(404).json({ "Erro" : "Cliente não Econtrado." });
      }else{
        return response.json(clienteView.render(existCliente));
      }
    }catch(err){
      console.log("CLIENT & ORDER ERR :" + err);
      return response.status(400).json({ "Erro" : "erro" });
    }
  },

  async edit(request: Request, response: Response, clienteData: Clientefinal, codigoId: number) {
    try{

      //const { id } = request.params;

      const clientesFinalRepository = getRepository(Clientefinal);

      const existClienteFinal = await clientesFinalRepository.findOne({
        where: {
          cd_pessoa: codigoId,
        }
      });

      if(existClienteFinal != undefined){

        existClienteFinal.nm_nome = clienteData.nm_nome;
        existClienteFinal.tx_cgc = clienteData.tx_cgc;
        existClienteFinal.tx_email = clienteData.tx_email;
        existClienteFinal.tx_fone = clienteData.tx_fone;
        existClienteFinal.tx_obs = clienteData.tx_obs;
        
        await clientesFinalRepository.save(existClienteFinal);
        return response.status(200);
      }else{
        return response.status(401);
      }
    }catch(err){
      console.log("CLIENT EDIT ERR :" + err);
      return response.status(401);
    }
  },

  async create(request: Request, response: Response, clienteData?: object) {
    try {

      /*
        CRIAR NOVO CLIENTE.
        VEM DO APP COMO { clientName, clientPhone, clientEmail, clientNotes }
        SAI PARA O BANCO { nm_nome, tx_fone, tx_email, tx_obs }
      */

      const {
        clientName,
        clientCgc,
        clientPhone,
        clientEmail,
        clientNotes,
        userCode,
      } = request.body;

      const clientesFinalRepository = getRepository(Clientefinal);

      if(clientName === undefined) {
        if(clienteData === undefined) {
          return response.status(400)
        } else {
          const schema = Yup.object().shape({
            nm_nome: Yup.string().required(),
            tx_cgc: Yup.string().nullable(),
            tx_fone: Yup.string().nullable(),
            tx_email: Yup.string().nullable(),
            tx_obs: Yup.string().nullable(),
            cd_id_ccli: Yup.string().required()
          });

          await schema.validate(clienteData, {
            abortEarly: false,
          });

          const clientefinalRepository = clientesFinalRepository.create(clienteData);
          await clientesFinalRepository.save(clientefinalRepository);
          
          return response.status(201);
        }
      } else {
        const existCliente = await clientesFinalRepository.findOne({
          where: {
            nm_nome: clientName
          }
        });

        if(existCliente != undefined) {
          const data: any = {
            nm_nome: clientName,
            tx_cgc: clientCgc,
            tx_fone: clientPhone,
            tx_email: clientEmail,
            tx_obs: clientNotes,
            cd_id_ccli: userCode,
            cd_ordem_id: userCode
          };

          const schema = Yup.object().shape({
            nm_nome: Yup.string().required(),
            tx_cgc: Yup.string().nullable(),
            tx_fone: Yup.string().nullable(),
            tx_email: Yup.string().required(),
            tx_obs: Yup.string().nullable(),
            cd_id_ccli: Yup.string().required(),
            cd_ordem_id: Yup.number().required()
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const clientefinalRepository = clientesFinalRepository.create(data);

          await clientesFinalRepository.save(clientefinalRepository);

          return response.status(201)
        } else {
          return response.status(409)
        }
      }

    }catch(err){
      console.log("CLIENT CREATE ERR :" + err);
      return response.status(400);
    }
  },

  // MYCLIENTS

  async userClients(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);
  
      const clientesFinalRepository = getRepository(Clientefinal);
  
      const clientes = await clientesFinalRepository.find({
        where: {
          cd_id_ccli: searchId
        }
      });

      if(clientes.length === 0) {
        return response.status(204).json({ "Vazio" : "Nenhuma Cliente Inserida." });
      } else {
        return response.json(clienteView.renderMany(clientes));
      }

    }catch(err){
      console.log("USER CLIENT ERR :" + err);
      return response.status(404).json({ "Erro" : "Nenhum Cliente encontrado com este Parâmetro." });
    }
  }

}