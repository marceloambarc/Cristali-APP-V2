import { Request, Response } from "express";
import { Between, getRepository, LessThan, LessThanOrEqual, MoreThan, In } from "typeorm";
import * as Yup from 'yup'

import Ordem from "../models/Ordem";
import ordemView from "../view/ordem_view";

import Clientefinal from "../models/ClienteFinal";
import ClienteController from "./ClienteController";
import OrdemReservaController from "./OrdemReservaController";

export default { 

  async index(request: Request, response: Response) {
    const ordensRepository = getRepository(Ordem);

    const ordens = await ordensRepository.find({
      order: {
        cd_id_ccli: "DESC"
      }
    });

    if(ordens.length === 0){
      return response.status(204).json({ "Vazio" : "Nenhuma Ordem Cadastrada." });
    }else{
      return response.json(ordemView.renderMany(ordens));
    }
  },

  async show(request: Request, response: Response) {
    try {

      const { id } = request.params;
  
      const ordensRepository = getRepository(Ordem);
  
      const ordem = await ordensRepository.findOne({
        where: {
          cd_id_ccli: id
        }
      });
  
      if(ordem === undefined){
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Cadastrada neste Usuário" });
      }else{
        return response.json(ordemView.render(ordem));
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async showOpenSales(request: Request, response: Response) {
    try {

      const { userCode } = request.body;

      const ordensRepository = getRepository(Ordem);

      var openSales;

      if(userCode !== undefined) {
        openSales = await ordensRepository.find({
          where: {
            cd_id_ccli: userCode,
            cd_habil_tipo : 217
          }
        });
      } else {
        openSales = await ordensRepository.find({
          where: {
            cd_habil_tipo : 217
          }
        });
      }

      if(openSales === undefined) {
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Aberta" });
      } else {
        if(openSales.length <= 0){
          return response.status(204).json({ "Vazio" : "Nenhuma Ordem Aberta" });
        } else {
          return response.json(ordemView.renderMany(openSales));
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async showInsertedSales(request: Request, response: Response) {
    try {

      const { userCode } = request.body;

      const ordensRepository = getRepository(Ordem);

      var insertedSales;

      if(userCode !== undefined) {
        insertedSales = await ordensRepository.find({
          where: {
            cd_id_ccli: userCode,
            cd_habil_tipo : 218
          }
        });
      } else {
        insertedSales = await ordensRepository.find({
          where: {
            cd_habil_tipo : 218
          }
        });
      }

      if(insertedSales === undefined) {
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Aberta" });
      } else {
        if(insertedSales.length <= 0){
          return response.status(204).json({ "Vazio" : "Nenhuma Ordem Aberta" });
        } else {
          return response.json(ordemView.renderMany(insertedSales));
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },
  
  async showSelectedPaymentSales(request: Request, response: Response) {
    try {

      const { userCode } = request.body;

      const ordensRepository = getRepository(Ordem);

      var selectedPaymentOrdem;

      if(userCode !== undefined) {
        selectedPaymentOrdem = await ordensRepository.find({
          where: {
            cd_id_ccli: userCode,
            cd_habil_tipo : 219
          }
        });
      } else {
        selectedPaymentOrdem = await ordensRepository.find({
          where: {
            cd_habil_tipo : 219
          }
        });        
      }

      if(selectedPaymentOrdem === undefined) {
        return response.status(404).json({ "Erro" : "Nenhuma Ordem Aberta" });
      } else {
        if(selectedPaymentOrdem.length <= 0){
          return response.status(204).json({ "Vazio" : "Nenhuma Ordem Aberta" });
        } else {
          return response.json(ordemView.renderMany(selectedPaymentOrdem));
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async edit(request: Request, response: Response) {
    try {

      const { id } = request.params;

      var {
        totalPrice,
        orderNotes,
        itens,
        clientId,
        client,
        orderReference,
        userCode
      } = request.body;

      if(orderNotes === '')
        orderNotes = 'Observação Não Inserida';

        itens.forEach((item, index, object) => {
          if(item.vl_preco === 0)
            object.splice(index, 1);
          if(item.vl_preco === '')
            object.splice(index, 1);
          if(item.cd_codigogerado === '')
            item.cd_codigogerado = 'Código Vazio';
          if(item.nm_produto === '')
            item.nm_produto = 'Nome Não Inserido';
          if(item.vl_preco)
            item.vl_preco = parseInt(item.vl_preco.replace(/\D/g, ""));
        });

       const ordensRepository = getRepository(Ordem);
       const clientesRepository = getRepository(Clientefinal);

       const totalClienteOrdens = await ordensRepository.find({
         where: {
           cd_clientefinal: clientId
         }
       });

       const existOrdem = await ordensRepository.findOne({
        where: {
          cd_id: id
        }
      });

      const existCliente = await clientesRepository.findOne({
        where: {
          nm_nome: client.clientName
        }
      });

      if(existOrdem === undefined){
        return response.status(404).json({ "Erro" : "Ordem não Existe." });
      }else{
        if(totalClienteOrdens.length === 1){

          if(existCliente != undefined) {
            
            if(existOrdem.cd_clientefinal === clientId) {
              
              existOrdem.vl_total = totalPrice;
              existOrdem.tx_obs = orderNotes;
              existOrdem.cd_habil_tipo = 217;
              existOrdem.tx_referencia = orderReference;
              existOrdem.itens = itens;

              existCliente.tx_cgc = client.clientCgc;
              existCliente.tx_email = client.clientEmail;
              existCliente.tx_fone = client.clientPhone;
              existCliente.tx_obs = client.clientNotes;

              await clientesRepository.save(existCliente);
              const Ordercreated = await ordensRepository.save(existOrdem);

              const codigo = Ordercreated.cd_id;
              const createOrdemReserva = await OrdemReservaController.edit(request, response, codigo);

              if(createOrdemReserva != undefined){
                if(createOrdemReserva.statusCode === 201){
                  return response.status(200).json(existOrdem);
                }else{
                  return response.status(createOrdemReserva.statusCode).json({ "Erro" : "Código 3 - Inicie uma nova venda." });
                }
              }else{
                return response.status(400).json({ "Erro" : "Entre em contato com o Suporte código[bkp]" });
              }
            } else {
              return response.status(406).json({ "Erro" : "Não é permitido alterar o Cliente após Criar Venda." });
            }
          } else {
            return response.status(406).json({ 'Erro': 'Não é permitido Alterar o Nome do Cliente' });
          }
        } else {

          if(existCliente != undefined) {

            if(existCliente.tx_email != client.clientEmail || existCliente.tx_fone != client.clientPhone || existCliente.tx_obs != client.clientNotes) {

              // CRIAR NOVO CLIENTE E SALVAR ORDEM
              const clienteData : any = {
                nm_nome: client.clientName,
                tx_cgc: client.clientCgc,
                tx_fone: client.clientPhone,
                tx_email: client.clientEmail,
                tx_obs: client.clientNotes,
                cd_id_ccli: userCode,
                cd_ordem_id: id
              }

              const createCliente = await ClienteController.create(request, response, clienteData);

              if(createCliente != undefined){
                if(createCliente.statusCode === 201) {
      
                  const existClienteCreated = await clientesRepository.findOne({
                    where: {
                      nm_nome: client.clientName,
                      tx_cgc: client.clientCgc,
                      tx_fone: client.clientPhone,
                      tx_email: client.clientEmail,
                      tx_obs: client.clientNotes
                    }
                  });
                  
                  if(existClienteCreated != undefined) {
                    const responseClienteId = existClienteCreated.cd_pessoa;

                    existOrdem.vl_total = totalPrice;
                    existOrdem.tx_obs = orderNotes;
                    existOrdem.cd_habil_tipo = 217;
                    existOrdem.cd_clientefinal = existClienteCreated.cd_pessoa;
                    existOrdem.tx_referencia = orderReference;
                    existOrdem.itens = itens;
                    
                    await ordensRepository.save(existOrdem);

                    return response.status(201).json(existOrdem);

                  }
                } else {
                  return response.status(createCliente.statusCode).json(createCliente.json);
                }
              } else {
                return response.status(400).json({ 'Erro' : 'Não foi Possível Criar o Cliente.' });
              }

            } else {

              existOrdem.vl_total = totalPrice;
              existOrdem.tx_obs = orderNotes;
              existOrdem.cd_habil_tipo = 217;
              existOrdem.tx_referencia = orderReference;
              existOrdem.itens = itens;
    
              await ordensRepository.save(existOrdem);

              return response.status(201).json({ 'Ok!' : 'Venda Editada.' });

            }
          }
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async editCondition(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const { condition, orderReference } = request.body;
      const setCondition = parseInt(condition);

      const ordensRepository = getRepository(Ordem);

      const existOrdem = await ordensRepository.findOne({
        where: {
          cd_id: id
        }
      });

      if(existOrdem === undefined){
        return response.status(404).json({ "Erro" : "Ordem não Econtrada" });
      } else {
        existOrdem.cd_habil_tipo = setCondition;
        existOrdem.tx_referencia = orderReference;
        await ordensRepository.save(existOrdem);
        const editOrdemReserva = await OrdemReservaController.editCondition(request, response);

        if(editOrdemReserva != undefined){
          if(editOrdemReserva.statusCode === 200){
            return response.status(200).json(existOrdem);
          }else{
            return response.status(400).json({ "Erro" : "Backup não permitiu alteração"});
          }
        }else{
          return response.status(400).json({ "Erro" : "Não existe esta Ordem no Backup."});
        }
      }

    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  async delete(request: Request, response: Response) {
    try {

      /*const ordensRepository = getRepository(Ordem);

      var d = new Date();
      d.setDate(d.getDate()-30);

      const existOrdem = await ordensRepository.find({
        where: {
          dt_criado: LessThan(d)
        }, relations: ['itens']
      });

      if(existOrdem.length <= 0) {
        return response.status(202).json({ "Ok!" : 'Nenhuma Ordem anterior a esta Data' });
      } else {
        existOrdem.map( async ordem => {
          await ordensRepository.remove(ordem);
        });

        return response.status(200).json({});
      }*/
      return response.status(200).json({});
    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async deleteNotAllowed(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);
      
      const existOrdem = await ordensRepository.find({
        where: {
          cd_id: searchId
        }, relations: ['itens']
      });

      if(existOrdem.length <= 0) {
        return response.status(302).json({ "Erro" : 'Nenhuma Ordem anterior a esta Data' });
      } else {
        existOrdem.map( async ordem => {
          await ordensRepository.remove(ordem);
        });

        return response.status(200).json({});
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async create(request: Request, response: Response) {
    try {
      /* CRIAR NOVA ORDEM DE VENDA 
        VEM DO APP { userCode, createdAt, totalPrice, orderNotes, condition }
        VAI PARA O BANCO { cd_id_ccli, dt_criado, vl_total, tx_obs, cd_habil_tipo }
      */

      //VARIÁVEIS DE CONTROLE DE CLIENTE.
      var blnExistClient = false;
      var blnEditClient = false;
      var blnClient = true;
      var codCliente = 0;

      var { 
        userCode,
        totalPrice,
        orderNotes,
        orderReference,
        client,
        itens
      } = request.body;

      if(orderNotes === undefined)
        orderNotes = 'Observação Não Inserida';

      itens.forEach((item, index, object) => {
        if(item.vl_preco === 0)
          object.splice(index, 1);
        if(item.vl_preco === '')
          object.splice(index, 1);
        if(item.cd_codigogerado === '')
          item.cd_codigogerado = 'Código Vazio';
        if(item.nm_produto === '')
          item.nm_produto = 'Nome Não Inserido';
        if(item.vl_preco)
          item.vl_preco = parseInt(item.vl_preco.replace(/\D/g, ""));
      });

      const ordensRepository = getRepository(Ordem);
      const clientesRepository = getRepository(Clientefinal);

      const existCliente = await clientesRepository.findOne({
        where: {
          nm_nome: client.clientName,
          cd_id_ccli: userCode,
        }
      });

      if(existCliente != undefined){
        blnExistClient = true;
        codCliente = existCliente.cd_pessoa;

        if(client.clientCgc != existCliente.tx_cgc 
          || client.clientPhone != existCliente.tx_fone
          || client.clientEmail != existCliente.tx_email
          || client.clientNotes != existCliente.tx_obs){
            blnEditClient = true;
            console.log("Parâmetros desiguais");
        }
      }

      const clienteData : any = {
        cd_pessoa: codCliente,
        nm_nome: client.clientName,
        tx_cgc: client.clientCgc,
        tx_fone: client.clientPhone,
        tx_email: client.clientEmail,
        tx_obs: client.clientNotes,
        cd_id_ccli: userCode,
      }

      if(blnExistClient){
        console.log("Cliente Existe");

        if(blnEditClient){
          //CLIENTE FINAL EXISTE E EXIGE ALTERAÇÃO DE PARÂMETRO.
          console.log("Editando Cliente");
          const editClient = await ClienteController.edit(request, response, clienteData, codCliente);
          if(editClient != undefined){
            if(editClient.statusCode === 201) {
              console.log("Cliente Editado");
              blnClient = true;
            }else{
              blnClient = false;
            }
          }else{
            blnClient = false;
          }
        }

      }else{
        //CRIAR CLIENTE
        console.log("Criando Cliente");
        const createCliente = await ClienteController.create(request, response, clienteData);

        if(createCliente != undefined){
          if(createCliente.statusCode === 201) {
            const existClienteCreated = await clientesRepository.findOne({
              where: {
                nm_nome: client.clientName,
                cd_id_ccli: userCode,
              }
            });
            if(existClienteCreated != undefined){

              codCliente = existClienteCreated.cd_pessoa;
              blnClient = true;

            }else{
              blnClient = false;
            }
          }else{
            blnClient = false;
          }
        }else{
          blnClient = false;
        }
      }
      console.log(blnClient);
      if(blnClient === false){
        console.log("Cliente não existente");
        return response.status(401).json({ "Erro" : "Entre em contato com o Suporte" });
      }else{
        console.log("Iniciando a criação da ordem");
        const ordemData : any = {
          cd_id_ccli: userCode,
          dt_criado: new Date(),
          vl_total: totalPrice,
          tx_obs: orderNotes,
          cd_habil_tipo: 217,
          cd_clientefinal: codCliente,
          tx_referencia: orderReference,
          itens
        };
  
        const schema = Yup.object().shape({
          cd_id_ccli: Yup.string().required(),
          dt_criado: Yup.date().default(() => new Date()),
          vl_total: Yup.string().required(),
          tx_obs: Yup.string().required(),
          cd_habil_tipo: Yup.number().required(),
          cd_clientefinal: Yup.number().required(),
          tx_referencia: Yup.string().required(),
          itens: Yup.array(
            Yup.object().shape({
              id: Yup.number().strip(),
              nm_produto: Yup.string().nullable(),
              cd_codigogerado: Yup.string().required(),
              vl_preco: Yup.string().required()
            })
          )
        });
  
        await schema.validate(ordemData, {
          abortEarly: false,
        });
  
        const ordemRepository = ordensRepository.create(ordemData);
        const Ordercreated : any = await ordensRepository.save(ordemRepository);
  
        const codigo = Ordercreated.cd_id;
        const createOrdemReserva = await OrdemReservaController.create(request, response, codigo);
  
        if(createOrdemReserva !== undefined){
          if(createOrdemReserva.statusCode === 201) {
            return response.status(201).json(ordemRepository);
          }else{
            return response.status(405).json({ "Erro" : "Entre em contato com o Suporte" });
          }
        }else{
          return response.status(400).json({ "Erro" : "Entre em contato com o Suporte" });
        }

      }


    }catch(err){
      return response.status(400).json({ "Erro" : err });
    }
  },

  //  MYCLIENTS

  async userOrders(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      const ordens = await ordensRepository.find({
        where: {
          cd_id_ccli: searchId
        },relations: ['itens']
      });

      if(ordens.length === 0) {
        return response.status(204).json({ "Vazio" : "Nenhuma Ordem Cadastrada" });
      } else {
        return response.json(ordemView.renderManyWithItens(ordens));
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async userSavedOrders(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      const ordens = await ordensRepository.find({
        where: [
          { cd_id_ccli: searchId, cd_habil_tipo: LessThanOrEqual(219) },
        ],
        relations: ['itens'],
        order: {
          cd_id: "DESC"
        }
      })

      if(ordens.length === 0) {
        return response.status(204).json({ "Vazio" : "Nenhuma Ordem Salva" });
      } else {
        return response.json(ordemView.renderManyWithItens(ordens));
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async userHystory(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      const ordens = await ordensRepository.find({
        relations: ['itens'],
        where: [
          { cd_id_ccli: searchId, cd_habil_tipo: MoreThan(219) },
        ],
        order: {
          cd_id: "DESC"
        }
      });

      if(ordens.length === 0) {
        return response.status(204).json({ "Vazio" : "Histórico Vazio" });
      } else {
        return response.json(ordemView.renderManyWithItens(ordens));
      }

    }catch(err) {
      return response.status(400).json({ "Erro" : err });
    }
  },

  async historyPaid(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      const ordens = await ordensRepository.find({
        where: [
          { cd_id_ccli: searchId, cd_habil_tipo: In([220,223,224]) },
        ],
        order: {
          cd_id: "DESC"
        }
      });
      
      if(ordens.length === 0) {
        return response.status(204).json({ "Vazio" : "Histórico Vazio" });
      } else {
        return response.json(ordemView.renderMany(ordens));
      }

    }catch(err) {
      return response.status(400).json({ "Erro": err });
    }
  },

  async historyNotPaid(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const searchId = parseInt(id);

      const ordensRepository = getRepository(Ordem);

      const ordens = await ordensRepository.find({
        where: [
          { cd_id_ccli: searchId, cd_habil_tipo: Between(221, 222) },
        ],
        order: {
          cd_id: "DESC"
        }
      });

      if(ordens.length === 0) {
        return response.status(204).json({ "Vazio" : "Histórico Vazio" });
      } else {
        return response.json(ordemView.renderMany(ordens));
      }

    }catch(err) {
      return response.status(400).json({ "Erro": err });
    }
  },
}