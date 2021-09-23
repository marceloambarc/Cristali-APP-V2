"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientAuth = clientAuth;
exports.adminAuth = adminAuth;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _credentials = require("../../credentials");

function clientAuth(request, response, next) {
  var authorization = request.headers.authorization;

  if (authorization != undefined) {
    var token = authorization.replace('Bearer', '').trim();

    try {
      var data = _jsonwebtoken["default"].verify(token, _credentials.JWTSecretUser); //Retornar Parametros necessários.

      /*const { id } = data as TokenPayload;
      request.userId = id;*/


      return next();
    } catch (_unused) {
      response.status(401).json({
        "Erro": "Problema na Autenticação."
      });
    }
  } else {
    response.status(401).json({
      "Erro": "Token Inválido"
    });
  }
}

function adminAuth(request, response, next) {
  var authorization = request.headers.authorization;

  if (authorization != undefined) {
    var token = authorization.replace('Bearer', '').trim();

    try {
      var data = _jsonwebtoken["default"].verify(token, _credentials.JWTSecretAdmin);

      if (data != undefined) {
        response.status(403).json({
          "Erro": "Rota não Autorizada."
        });
      } else {
        response.status(401).json({
          "Erro": "Problema na Autenticação."
        });
      }
    } catch (_unused2) {
      response.status(401).json({
        "Erro": "Problema na Autenticação."
      });
    }
  } else {
    response.status(401).json({
      "Erro": "Token Inválido"
    });
  }
}