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

var _ClienteFinal = _interopRequireDefault(require("../models/ClienteFinal"));

var _cliente_view = _interopRequireDefault(require("../view/cliente_view"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  index: function index(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var clientesFinalRepository, clientesFinal;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              clientesFinalRepository = (0, _typeorm.getRepository)(_ClienteFinal["default"]);
              _context.next = 3;
              return clientesFinalRepository.find();

            case 3:
              clientesFinal = _context.sent;

              if (!(clientesFinal.length === 0)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", response.status(204).json({
                "Vazio": "Nenhum Cliente Final Cadastrado"
              }));

            case 8:
              return _context.abrupt("return", response.json(_cliente_view["default"].renderMany(clientesFinal)));

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
      var id, searchId, clientesFinalRepository, cliente;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = request.params.id;
              searchId = parseInt(id);
              clientesFinalRepository = (0, _typeorm.getRepository)(_ClienteFinal["default"]);
              _context2.next = 6;
              return clientesFinalRepository.findOneOrFail(searchId);

            case 6:
              cliente = _context2.sent;
              return _context2.abrupt("return", response.json(_cliente_view["default"].render(cliente)));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", response.status(404).json({
                "Erro": "Nenhum Cliente encontrado com este Parâmetro."
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }))();
  },
  showWithOrders: function showWithOrders(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var clientName, clientesFinalRepository, existCliente;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              clientName = request.body.clientName;
              clientesFinalRepository = (0, _typeorm.getRepository)(_ClienteFinal["default"]);
              _context3.next = 5;
              return clientesFinalRepository.findOne({
                where: [{
                  nm_nome: clientName
                }]
              });

            case 5:
              existCliente = _context3.sent;

              if (!(existCliente === undefined)) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", response.status(404).json({
                "Erro": "Cliente não Econtrado."
              }));

            case 10:
              return _context3.abrupt("return", response.json(_cliente_view["default"].render(existCliente)));

            case 11:
              _context3.next = 16;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", response.status(400).json({
                "Erro": _context3.t0
              }));

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 13]]);
    }))();
  },
  edit: function edit(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var id, _request$body, clientName, clientCgc, clientPhone, clientEmail, clientNotes, clientesFinalRepository, existClienteFinal;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = request.params.id;
              _request$body = request.body, clientName = _request$body.clientName, clientCgc = _request$body.clientCgc, clientPhone = _request$body.clientPhone, clientEmail = _request$body.clientEmail, clientNotes = _request$body.clientNotes;
              clientesFinalRepository = (0, _typeorm.getRepository)(_ClienteFinal["default"]);
              _context4.next = 6;
              return clientesFinalRepository.findOne({
                where: {
                  cd_pessoa: id
                }
              });

            case 6:
              existClienteFinal = _context4.sent;

              if (!(existClienteFinal === undefined)) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", response.status(404).json({
                "Erro": "Cliente não Existe"
              }));

            case 11:
              existClienteFinal.nm_nome = clientName;
              existClienteFinal.tx_cgc = clientCgc;
              existClienteFinal.tx_fone = clientPhone;
              existClienteFinal.tx_email = clientEmail;
              existClienteFinal.tx_obs = clientNotes;
              _context4.next = 18;
              return clientesFinalRepository.save(existClienteFinal);

            case 18:
              return _context4.abrupt("return", response.status(200).json(existClienteFinal));

            case 19:
              _context4.next = 24;
              break;

            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", response.status(400).json({
                "Erro": _context4.t0
              }));

            case 24:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 21]]);
    }))();
  },
  create: function create(request, response, clienteData) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _request$body2, clientName, clientCgc, clientPhone, clientEmail, clientNotes, userCode, clientesFinalRepository, schema, clientefinalRepository, existCliente, data, _schema, _clientefinalRepository;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              /*
                CRIAR NOVO CLIENTE.
                VEM DO APP COMO { clientName, clientPhone, clientEmail, clientNotes }
                SAI PARA O BANCO { nm_nome, tx_fone, tx_email, tx_obs }
              */
              _request$body2 = request.body, clientName = _request$body2.clientName, clientCgc = _request$body2.clientCgc, clientPhone = _request$body2.clientPhone, clientEmail = _request$body2.clientEmail, clientNotes = _request$body2.clientNotes, userCode = _request$body2.userCode;
              clientesFinalRepository = (0, _typeorm.getRepository)(_ClienteFinal["default"]);

              if (!(clientName === undefined)) {
                _context5.next = 17;
                break;
              }

              if (!(clienteData === undefined)) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", response.status(400).json({
                "Erro": "Parâmetros não Enviados."
              }));

            case 8:
              schema = Yup.object().shape({
                nm_nome: Yup.string().required(),
                tx_cgc: Yup.string().nullable(),
                tx_fone: Yup.string().nullable(),
                tx_email: Yup.string().nullable(),
                tx_obs: Yup.string().nullable(),
                cd_id_ccli: Yup.string().required(),
                cd_ordem_id: Yup.number().required()
              });
              _context5.next = 11;
              return schema.validate(clienteData, {
                abortEarly: false
              });

            case 11:
              clientefinalRepository = clientesFinalRepository.create(clienteData);
              _context5.next = 14;
              return clientesFinalRepository.save(clientefinalRepository);

            case 14:
              return _context5.abrupt("return", response.status(201));

            case 15:
              _context5.next = 32;
              break;

            case 17:
              _context5.next = 19;
              return clientesFinalRepository.findOne({
                where: {
                  nm_nome: clientName
                }
              });

            case 19:
              existCliente = _context5.sent;

              if (!(existCliente != undefined)) {
                _context5.next = 31;
                break;
              }

              data = {
                nm_nome: clientName,
                tx_cgc: clientCgc,
                tx_fone: clientPhone,
                tx_email: clientEmail,
                tx_obs: clientNotes,
                cd_id_ccli: userCode,
                cd_ordem_id: userCode
              };
              _schema = Yup.object().shape({
                nm_nome: Yup.string().required(),
                tx_cgc: Yup.string().nullable(),
                tx_fone: Yup.string().nullable(),
                tx_email: Yup.string().required(),
                tx_obs: Yup.string().nullable(),
                cd_id_ccli: Yup.string().required(),
                cd_ordem_id: Yup.number().required()
              });
              _context5.next = 25;
              return _schema.validate(data, {
                abortEarly: false
              });

            case 25:
              _clientefinalRepository = clientesFinalRepository.create(data);
              _context5.next = 28;
              return clientesFinalRepository.save(_clientefinalRepository);

            case 28:
              return _context5.abrupt("return", response.status(201).json(_clientefinalRepository));

            case 31:
              return _context5.abrupt("return", response.status(409).json({
                "Erro": "Cliente Já Cadastrado."
              }));

            case 32:
              _context5.next = 37;
              break;

            case 34:
              _context5.prev = 34;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", response.status(400).json({
                "Erro": _context5.t0
              }));

            case 37:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 34]]);
    }))();
  },
  // MYCLIENTS
  userClients: function userClients(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var id, searchId, clientesFinalRepository, clientes;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              id = request.params.id;
              searchId = parseInt(id);
              clientesFinalRepository = (0, _typeorm.getRepository)(_ClienteFinal["default"]);
              _context6.next = 6;
              return clientesFinalRepository.find({
                where: {
                  cd_id_ccli: searchId
                }
              });

            case 6:
              clientes = _context6.sent;

              if (!(clientes.length === 0)) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", response.status(204).json({
                "Vazio": "Nenhuma Cliente Inserida."
              }));

            case 11:
              return _context6.abrupt("return", response.json(_cliente_view["default"].renderMany(clientes)));

            case 12:
              _context6.next = 17;
              break;

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", response.status(404).json({
                "Erro": "Nenhum Cliente encontrado com este Parâmetro."
              }));

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 14]]);
    }))();
  }
};
exports["default"] = _default;