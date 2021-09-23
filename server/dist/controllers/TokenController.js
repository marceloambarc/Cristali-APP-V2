"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeorm = require("typeorm");

var Yup = _interopRequireWildcard(require("yup"));

var _Token = _interopRequireDefault(require("../models/Token"));

var _token_view = _interopRequireDefault(require("../view/token_view"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  index: function index(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var tokensRepository, tokens;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokensRepository = (0, _typeorm.getRepository)(_Token["default"]);
              _context.next = 3;
              return tokensRepository.find();

            case 3:
              tokens = _context.sent;

              if (!(tokens.length === 0)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", response.status(204).json({
                "Vazio": "Nenhum Token Inserido."
              }));

            case 8:
              return _context.abrupt("return", response.status(200).json([_token_view["default"].renderMany(tokens), request.userId]));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  show: function show(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var id, searchId, tokensRepository, token;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = request.params.id;
              searchId = parseInt(id);
              tokensRepository = (0, _typeorm.getRepository)(_Token["default"]);
              _context2.next = 5;
              return tokensRepository.findOneOrFail(searchId);

            case 5:
              token = _context2.sent;

              if (!token) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", response.json(_token_view["default"].render(token)));

            case 10:
              return _context2.abrupt("return", response.status(404));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  create: function create(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var deviceToken, tokensRepository, existToken, data, schema, tokenRepository;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              /* CRIAR NOVO TOKEN DE DISPOSITIVO FÍSICO PARA 
              GERENCIAMENTO DE EVETOS E NOTIFICAÇÕES
              VEM DO APP COMO { id, deviceToken, createdAt, updatedAt }
              SAI PARA O BANCO { id, token_celular, dt_criado, dt_modificado }
                NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS 
              RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
              */
              deviceToken = request.body.deviceToken;
              tokensRepository = (0, _typeorm.getRepository)(_Token["default"]);
              _context3.next = 5;
              return tokensRepository.findOne({
                where: [{
                  token_celular: deviceToken
                }]
              });

            case 5:
              existToken = _context3.sent;

              if (!(!existToken && existToken !== '')) {
                _context3.next = 17;
                break;
              }

              data = {
                token_celular: deviceToken,
                dt_criado: new Date(),
                dt_modificado: new Date()
              };
              schema = Yup.object().shape({
                token_celular: Yup.string().required(),
                dt_criado: Yup.date().required(),
                dt_modificado: Yup.date().required()
              });
              _context3.next = 11;
              return schema.validate(data, {
                abortEarly: false
              });

            case 11:
              tokenRepository = tokensRepository.create(data);
              _context3.next = 14;
              return tokensRepository.save(tokenRepository);

            case 14:
              return _context3.abrupt("return", response.status(201).json(tokenRepository));

            case 17:
              return _context3.abrupt("return", response.status(409).json({
                "Ops!": "Token já Cadastrado"
              }));

            case 18:
              _context3.next = 23;
              break;

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", response.status(400).json({
                "Erro": _context3.t0
              }));

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 20]]);
    }))();
  }
};
exports["default"] = _default;