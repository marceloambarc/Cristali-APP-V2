import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWTSecretUser } from "../../credentials";

export function clientAuth(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;
  if(authorization != undefined) {

   const token = authorization.replace('Bearer', '').trim();

    try {
      jwt.verify(token, JWTSecretUser);

      return next();
    } catch {
      response.status(401).json({ "Erro" : "Problema na Autenticação." });
    }

  } else {
    response.status(401).json({ "Erro" : "Token Inválido" });
  }
}