import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import Clientefinal from "../models/Clientefinal";
import clienteView from "../view/cliente_view";

export default {

  async index(request: Request, response: Response) {
    const clientesFinalRepository = getRepository(Clientefinal);

    const clientesFinal = await clientesFinalRepository.find();

    if(clientesFinal.length === 0){
      return response.status(204).json({ "Vazio": "Nenhum Cliente Final Cadastrado" });
    }else{
      return response.json(clienteView.renderMany(clientesFinal));
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
      return response.status(400).json({ "Erro" : err });
    }
  },

  async edit(request: Request, response: Response) {
    try{

      const { id } = request.params;

      const {
        clientName,
        clientCgc,
        clientPhone,
        clientEmail,
        clientNotes
      } = request.body;

      const clientesFinalRepository = getRepository(Clientefinal);

      const existClienteFinal = await clientesFinalRepository.findOne({
        where: {
          cd_pessoa: id
        }
      });

      if(existClienteFinal === undefined){
        return response.status(404).json({ "Erro" : "Cliente não Existe" });
      }else{
        existClienteFinal.nm_nome = clientName;
        existClienteFinal.tx_cgc = clientCgc;
        existClienteFinal.tx_fone = clientPhone;
        existClienteFinal.tx_email = clientEmail;
        existClienteFinal.tx_obs = clientNotes;
        await clientesFinalRepository.save(existClienteFinal);
        return response.status(200).json(existClienteFinal);
      } 

    }catch(err){
      return response.status(400).json({ "Erro" : err });
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
          return response.status(400).json({ "Erro" : "Parâmetros não Enviados." });
        } else {
          const schema = Yup.object().shape({
            nm_nome: Yup.string().required(),
            tx_cgc: Yup.string().required(),
            tx_fone: Yup.string().nullable(),
            tx_email: Yup.string().nullable(),
            tx_obs: Yup.string().nullable(),
            cd_id_ccli: Yup.string().required(),
            cd_ordem_id: Yup.number().required()
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
            tx_cgc: Yup.string().required(),
            tx_fone: Yup.string().required(),
            tx_email: Yup.string().required(),
            tx_obs: Yup.string().required(),
            cd_id_ccli: Yup.string().required(),
            cd_ordem_id: Yup.number().required()
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const clientefinalRepository = clientesFinalRepository.create(data);

          await clientesFinalRepository.save(clientefinalRepository);

          return response.status(201).json(clientefinalRepository);
        } else {
          return response.status(409).json({ "Erro" : "Cliente Já Cadastrado." });
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro": err });
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
      return response.status(404).json({ "Erro" : "Nenhum Cliente encontrado com este Parâmetro." });
    }
  }

}