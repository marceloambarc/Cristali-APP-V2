import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWTSecretUser, JWTSecretAdmin } from "../../credentials";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function clientAuth(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;
  if(authorization != undefined) {

   const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, JWTSecretUser);
      
      //Retornar Parametros necessários.
      /*const { id } = data as TokenPayload;
      request.userId = id;*/

      return next();
    } catch {
      response.status(401).json({ "Erro" : "Problema na Autenticação." });
    }

  } else {
    response.status(401).json({ "Erro" : "Token Inválido" });
  }
}

export function adminAuth(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;
  if(authorization != undefined) {

   const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, JWTSecretAdmin);
      if(data != undefined) {
        response.status(403).json({ "Erro" : "Rota não Autorizada." });
      } else {
        response.status(401).json({ "Erro" : "Problema na Autenticação." });
      }
    } catch {
      response.status(401).json({ "Erro" : "Problema na Autenticação." });
    }
  } else {
    response.status(401).json({ "Erro" : "Token Inválido" });
  }
}