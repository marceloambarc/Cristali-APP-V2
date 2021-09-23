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

var _Ordem = _interopRequireDefault(require("../models/Ordem"));

var _ordem_view = _interopRequireDefault(require("../view/ordem_view"));

var _ClienteFinal = _interopRequireDefault(require("../models/ClienteFinal"));

var _ClienteController = _interopRequireDefault(require("./ClienteController"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  index: function index(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var ordensRepository, ordens;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context.next = 3;
              return ordensRepository.find();

            case 3:
              ordens = _context.sent;

              if (!(ordens.length === 0)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", response.status(204).json({
                "Vazio": "Nenhuma Ordem Cadastrada."
              }));

            case 8:
              return _context.abrupt("return", response.json(_ordem_view["default"].renderMany(ordens)));

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
      var id, ordensRepository, ordem;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = request.params.id;
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context2.next = 5;
              return ordensRepository.findOne({
                where: {
                  cd_id_ccli: id
                }
              });

            case 5:
              ordem = _context2.sent;

              if (!(ordem === undefined)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", response.status(404).json({
                "Erro": "Nenhuma Ordem Cadastrada neste Usuário"
              }));

            case 10:
              return _context2.abrupt("return", response.json(_ordem_view["default"].render(ordem)));

            case 11:
              _context2.next = 16;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", response.status(400).json({
                "Erro": _context2.t0
              }));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 13]]);
    }))();
  },
  showOpenSales: function showOpenSales(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var userCode, ordensRepository, openSales;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              userCode = request.body.userCode;
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);

              if (!(userCode !== undefined)) {
                _context3.next = 9;
                break;
              }

              _context3.next = 6;
              return ordensRepository.find({
                where: {
                  cd_id_ccli: userCode,
                  cd_habil_tipo: 217
                }
              });

            case 6:
              openSales = _context3.sent;
              _context3.next = 12;
              break;

            case 9:
              _context3.next = 11;
              return ordensRepository.find({
                where: {
                  cd_habil_tipo: 217
                }
              });

            case 11:
              openSales = _context3.sent;

            case 12:
              if (!(openSales === undefined)) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", response.status(404).json({
                "Erro": "Nenhuma Ordem Aberta"
              }));

            case 16:
              if (!(openSales.length <= 0)) {
                _context3.next = 20;
                break;
              }

              return _context3.abrupt("return", response.status(204).json({
                "Vazio": "Nenhuma Ordem Aberta"
              }));

            case 20:
              return _context3.abrupt("return", response.json(_ordem_view["default"].renderMany(openSales)));

            case 21:
              _context3.next = 26;
              break;

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", response.status(400).json({
                "Erro": _context3.t0
              }));

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 23]]);
    }))();
  },
  showInsertedSales: function showInsertedSales(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var userCode, ordensRepository, insertedSales;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              userCode = request.body.userCode;
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);

              if (!(userCode !== undefined)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 6;
              return ordensRepository.find({
                where: {
                  cd_id_ccli: userCode,
                  cd_habil_tipo: 218
                }
              });

            case 6:
              insertedSales = _context4.sent;
              _context4.next = 12;
              break;

            case 9:
              _context4.next = 11;
              return ordensRepository.find({
                where: {
                  cd_habil_tipo: 218
                }
              });

            case 11:
              insertedSales = _context4.sent;

            case 12:
              if (!(insertedSales === undefined)) {
                _context4.next = 16;
                break;
              }

              return _context4.abrupt("return", response.status(404).json({
                "Erro": "Nenhuma Ordem Aberta"
              }));

            case 16:
              if (!(insertedSales.length <= 0)) {
                _context4.next = 20;
                break;
              }

              return _context4.abrupt("return", response.status(204).json({
                "Vazio": "Nenhuma Ordem Aberta"
              }));

            case 20:
              return _context4.abrupt("return", response.json(_ordem_view["default"].renderMany(insertedSales)));

            case 21:
              _context4.next = 26;
              break;

            case 23:
              _context4.prev = 23;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", response.status(400).json({
                "Erro": _context4.t0
              }));

            case 26:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 23]]);
    }))();
  },
  showSelectedPaymentSales: function showSelectedPaymentSales(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var userCode, ordensRepository, selectedPaymentOrdem;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              userCode = request.body.userCode;
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);

              if (!(userCode !== undefined)) {
                _context5.next = 9;
                break;
              }

              _context5.next = 6;
              return ordensRepository.find({
                where: {
                  cd_id_ccli: userCode,
                  cd_habil_tipo: 219
                }
              });

            case 6:
              selectedPaymentOrdem = _context5.sent;
              _context5.next = 12;
              break;

            case 9:
              _context5.next = 11;
              return ordensRepository.find({
                where: {
                  cd_habil_tipo: 219
                }
              });

            case 11:
              selectedPaymentOrdem = _context5.sent;

            case 12:
              if (!(selectedPaymentOrdem === undefined)) {
                _context5.next = 16;
                break;
              }

              return _context5.abrupt("return", response.status(404).json({
                "Erro": "Nenhuma Ordem Aberta"
              }));

            case 16:
              if (!(selectedPaymentOrdem.length <= 0)) {
                _context5.next = 20;
                break;
              }

              return _context5.abrupt("return", response.status(204).json({
                "Vazio": "Nenhuma Ordem Aberta"
              }));

            case 20:
              return _context5.abrupt("return", response.json(_ordem_view["default"].renderMany(selectedPaymentOrdem)));

            case 21:
              _context5.next = 26;
              break;

            case 23:
              _context5.prev = 23;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", response.status(400).json({
                "Erro": _context5.t0
              }));

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 23]]);
    }))();
  },
  edit: function edit(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var id, _request$body, totalPrice, orderNotes, itens, clientId, client, userCode, ordensRepository, clientesRepository, totalClienteOrdens, existOrdem, existCliente, clienteData, createCliente, existClienteCreated, responseClienteId;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              id = request.params.id;
              _request$body = request.body, totalPrice = _request$body.totalPrice, orderNotes = _request$body.orderNotes, itens = _request$body.itens, clientId = _request$body.clientId, client = _request$body.client, userCode = _request$body.userCode;
              if (orderNotes === '') orderNotes = 'Observação Não Inserida';
              itens.forEach(function (item) {
                if (item.cd_codigogerado === '') item.cd_codigogerado = 'Código Vazio';
                if (item.nm_produto === '') item.nm_produto = 'Nome Não Inserido';
                if (item.vl_preco) item.vl_preco = parseInt(item.vl_preco.replace(/\D/g, ""));
                if (item.vl_preco === '') item.vl_preco = 0;
              });
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              clientesRepository = (0, _typeorm.getRepository)(_ClienteFinal["default"]);
              _context6.next = 9;
              return ordensRepository.find({
                where: {
                  cd_clientefinal: clientId
                }
              });

            case 9:
              totalClienteOrdens = _context6.sent;
              _context6.next = 12;
              return ordensRepository.findOne({
                where: {
                  cd_id: id
                }
              });

            case 12:
              existOrdem = _context6.sent;
              _context6.next = 15;
              return clientesRepository.findOne({
                where: {
                  nm_nome: client.clientName
                }
              });

            case 15:
              existCliente = _context6.sent;

              if (!(existOrdem === undefined)) {
                _context6.next = 20;
                break;
              }

              return _context6.abrupt("return", response.status(404).json({
                "Erro": "Ordem não Existe."
              }));

            case 20:
              if (!(totalClienteOrdens.length === 1)) {
                _context6.next = 44;
                break;
              }

              if (!(existCliente != undefined)) {
                _context6.next = 41;
                break;
              }

              if (!(existOrdem.cd_clientefinal === clientId)) {
                _context6.next = 38;
                break;
              }

              existOrdem.vl_total = totalPrice;
              existOrdem.tx_obs = orderNotes;
              existOrdem.cd_habil_tipo = 217;
              existOrdem.itens = itens;
              existCliente.tx_cgc = client.clientCgc;
              existCliente.tx_email = client.clientEmail;
              existCliente.tx_fone = client.clientPhone;
              existCliente.tx_obs = client.clientNotes;
              _context6.next = 33;
              return clientesRepository.save(existCliente);

            case 33:
              _context6.next = 35;
              return ordensRepository.save(existOrdem);

            case 35:
              return _context6.abrupt("return", response.status(200).json(existOrdem));

            case 38:
              return _context6.abrupt("return", response.status(406).json({
                "Erro": "Não é permitido alterar o Cliente após Criar Venda."
              }));

            case 39:
              _context6.next = 42;
              break;

            case 41:
              return _context6.abrupt("return", response.status(406).json({
                'Erro': 'Não é permitido Alterar o Nome do Cliente'
              }));

            case 42:
              _context6.next = 80;
              break;

            case 44:
              if (!(existCliente != undefined)) {
                _context6.next = 80;
                break;
              }

              if (!(existCliente.tx_email != client.clientEmail || existCliente.tx_fone != client.clientPhone || existCliente.tx_obs != client.clientNotes)) {
                _context6.next = 73;
                break;
              }

              // CRIAR NOVO CLIENTE E SALVAR ORDEM
              clienteData = {
                nm_nome: client.clientName,
                tx_cgc: client.clientCgc,
                tx_fone: client.clientPhone,
                tx_email: client.clientEmail,
                tx_obs: client.clientNotes,
                cd_id_ccli: userCode,
                cd_ordem_id: id
              };
              _context6.next = 49;
              return _ClienteController["default"].create(request, response, clienteData);

            case 49:
              createCliente = _context6.sent;

              if (!(createCliente != undefined)) {
                _context6.next = 70;
                break;
              }

              if (!(createCliente.statusCode === 201)) {
                _context6.next = 67;
                break;
              }

              _context6.next = 54;
              return clientesRepository.findOne({
                where: {
                  nm_nome: client.clientName,
                  tx_cgc: client.clientCgc,
                  tx_fone: client.clientPhone,
                  tx_email: client.clientEmail,
                  tx_obs: client.clientNotes
                }
              });

            case 54:
              existClienteCreated = _context6.sent;

              if (!(existClienteCreated != undefined)) {
                _context6.next = 65;
                break;
              }

              responseClienteId = existClienteCreated.cd_pessoa;
              existOrdem.vl_total = totalPrice;
              existOrdem.tx_obs = orderNotes;
              existOrdem.cd_habil_tipo = 217;
              existOrdem.itens = itens;
              existOrdem.cd_clientefinal = existClienteCreated.cd_pessoa;
              _context6.next = 64;
              return ordensRepository.save(existOrdem);

            case 64:
              return _context6.abrupt("return", response.status(201).json(existOrdem));

            case 65:
              _context6.next = 68;
              break;

            case 67:
              return _context6.abrupt("return", response.status(createCliente.statusCode).json(createCliente.json));

            case 68:
              _context6.next = 71;
              break;

            case 70:
              return _context6.abrupt("return", response.status(400).json({
                'Erro': 'Não foi Possível Criar o Cliente.'
              }));

            case 71:
              _context6.next = 80;
              break;

            case 73:
              existOrdem.vl_total = totalPrice;
              existOrdem.tx_obs = orderNotes;
              existOrdem.cd_habil_tipo = 217;
              existOrdem.itens = itens;
              _context6.next = 79;
              return ordensRepository.save(existOrdem);

            case 79:
              return _context6.abrupt("return", response.status(201).json({
                'Ok!': 'Venda Editada.'
              }));

            case 80:
              _context6.next = 85;
              break;

            case 82:
              _context6.prev = 82;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", response.status(400).json({
                "Erro": _context6.t0
              }));

            case 85:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 82]]);
    }))();
  },
  editCondition: function editCondition(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var id, condition, setCondition, ordensRepository, existOrdem;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              id = request.params.id;
              condition = request.body.condition;
              setCondition = parseInt(condition);
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context7.next = 7;
              return ordensRepository.findOne({
                where: {
                  cd_id: id
                }
              });

            case 7:
              existOrdem = _context7.sent;

              if (!(existOrdem === undefined)) {
                _context7.next = 12;
                break;
              }

              return _context7.abrupt("return", response.status(404).json({
                "Erro": "Ordem não Econtrada"
              }));

            case 12:
              existOrdem.cd_habil_tipo = setCondition;
              _context7.next = 15;
              return ordensRepository.save(existOrdem);

            case 15:
              return _context7.abrupt("return", response.status(200).json(existOrdem));

            case 16:
              _context7.next = 21;
              break;

            case 18:
              _context7.prev = 18;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", response.status(400).json({
                "Erro": _context7.t0
              }));

            case 21:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 18]]);
    }))();
  },
  "delete": function _delete(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var ordensRepository, d, existOrdem;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              d = new Date();
              d.setDate(d.getDate() - 30);
              _context9.next = 6;
              return ordensRepository.find({
                where: {
                  dt_criado: (0, _typeorm.LessThan)(d)
                },
                relations: ['itens']
              });

            case 6:
              existOrdem = _context9.sent;

              if (!(existOrdem.length <= 0)) {
                _context9.next = 11;
                break;
              }

              return _context9.abrupt("return", response.status(202).json({
                "Ok!": 'Nenhuma Ordem anterior a esta Data'
              }));

            case 11:
              existOrdem.map( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(ordem) {
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return ordensRepository.remove(ordem);

                        case 2:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());
              return _context9.abrupt("return", response.status(200).json({}));

            case 13:
              _context9.next = 18;
              break;

            case 15:
              _context9.prev = 15;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", response.status(400).json({
                "Erro": _context9.t0
              }));

            case 18:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 15]]);
    }))();
  },
  deleteNotAllowed: function deleteNotAllowed(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var id, searchId, ordensRepository, existOrdem;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              id = request.params.id;
              searchId = parseInt(id);
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context11.next = 6;
              return ordensRepository.find({
                where: {
                  cd_id: searchId
                },
                relations: ['itens']
              });

            case 6:
              existOrdem = _context11.sent;

              if (!(existOrdem.length <= 0)) {
                _context11.next = 11;
                break;
              }

              return _context11.abrupt("return", response.status(302).json({
                "Erro": 'Nenhuma Ordem anterior a esta Data'
              }));

            case 11:
              existOrdem.map( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(ordem) {
                  return _regenerator["default"].wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return ordensRepository.remove(ordem);

                        case 2:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
              return _context11.abrupt("return", response.status(200).json({}));

            case 13:
              _context11.next = 18;
              break;

            case 15:
              _context11.prev = 15;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", response.status(400).json({
                "Erro": _context11.t0
              }));

            case 18:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 15]]);
    }))();
  },
  create: function create(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var _request$body2, userCode, totalPrice, orderNotes, client, itens, ordensRepository, clientesRepository, existCliente, codPessoa, data, schema, ordemRepository, clienteData, createCliente, existClienteCreated, responseClienteId, _data, _schema, _ordemRepository;

      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;

              /* CRIAR NOVA ORDEM DE VENDA 
                VEM DO APP { userCode, createdAt, totalPrice, orderNotes, condition }
                VAI PARA O BANCO { cd_id_ccli, dt_criado, vl_total, tx_obs, cd_habil_tipo }
              */
              _request$body2 = request.body, userCode = _request$body2.userCode, totalPrice = _request$body2.totalPrice, orderNotes = _request$body2.orderNotes, client = _request$body2.client, itens = _request$body2.itens;
              if (orderNotes === undefined) orderNotes = 'Observação Não Inserida';
              itens.forEach(function (item, index, object) {
                if (item.vl_preco === 0) object.splice(index, 1);
                if (item.vl_preco === '') object.splice(index, 1);
                if (item.cd_codigogerado === '') item.cd_codigogerado = 'Código Vazio';
                if (item.nm_produto === '') item.nm_produto = 'Nome Não Inserido';
                if (item.vl_preco) item.vl_preco = parseInt(item.vl_preco.replace(/\D/g, ""));
              });
              console.log(itens);
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              clientesRepository = (0, _typeorm.getRepository)(_ClienteFinal["default"]);
              _context12.next = 9;
              return clientesRepository.findOne({
                where: {
                  nm_nome: client.clientName
                }
              });

            case 9:
              existCliente = _context12.sent;

              if (!(existCliente != undefined)) {
                _context12.next = 22;
                break;
              }

              codPessoa = existCliente.cd_pessoa;
              data = {
                cd_id_ccli: userCode,
                dt_criado: new Date(),
                vl_total: totalPrice,
                tx_obs: orderNotes,
                cd_habil_tipo: 217,
                cd_clientefinal: codPessoa,
                itens: itens
              };
              schema = Yup.object().shape({
                cd_id_ccli: Yup.string().required(),
                dt_criado: Yup.date()["default"](function () {
                  return new Date();
                }),
                vl_total: Yup.string().required(),
                tx_obs: Yup.string().required(),
                cd_habil_tipo: Yup.number().required(),
                cd_clientefinal: Yup.number().required(),
                itens: Yup.array(Yup.object().shape({
                  id: Yup.number().strip(),
                  nm_produto: Yup.string().nullable(),
                  cd_codigogerado: Yup.string().required(),
                  vl_preco: Yup.string().required()
                }))
              });
              _context12.next = 16;
              return schema.validate(data, {
                abortEarly: false
              });

            case 16:
              ordemRepository = ordensRepository.create(data);
              _context12.next = 19;
              return ordensRepository.save(ordemRepository);

            case 19:
              return _context12.abrupt("return", response.status(201).json(ordemRepository));

            case 22:
              // CRIAR NOVO CLIENTE E SALVAR ORDEM
              clienteData = {
                nm_nome: client.clientName,
                tx_cgc: client.clientCgc,
                tx_fone: client.clientPhone,
                tx_email: client.clientEmail,
                tx_obs: client.clientNotes,
                cd_id_ccli: userCode,
                cd_ordem_id: 1
              };
              _context12.next = 25;
              return _ClienteController["default"].create(request, response, clienteData);

            case 25:
              createCliente = _context12.sent;

              if (!(createCliente != undefined)) {
                _context12.next = 45;
                break;
              }

              if (!(createCliente.statusCode === 201)) {
                _context12.next = 42;
                break;
              }

              _context12.next = 30;
              return clientesRepository.findOne({
                where: {
                  nm_nome: client.clientName
                }
              });

            case 30:
              existClienteCreated = _context12.sent;
              responseClienteId = existClienteCreated === null || existClienteCreated === void 0 ? void 0 : existClienteCreated.cd_pessoa;
              _data = {
                cd_id_ccli: userCode,
                dt_criado: new Date(),
                vl_total: totalPrice,
                tx_obs: orderNotes,
                cd_habil_tipo: 0,
                cd_clientefinal: responseClienteId,
                itens: itens
              };
              _schema = Yup.object().shape({
                cd_id_ccli: Yup.string().required(),
                dt_criado: Yup.date()["default"](function () {
                  return new Date();
                }),
                vl_total: Yup.string().required(),
                tx_obs: Yup.string().required(),
                cd_habil_tipo: Yup.number().required(),
                cd_clientefinal: Yup.number().required(),
                itens: Yup.array(Yup.object().shape({
                  nm_produto: Yup.string().nullable(),
                  cd_codigogerado: Yup.string().required(),
                  vl_preco: Yup.number().required()
                }))
              });
              _context12.next = 36;
              return _schema.validate(_data, {
                abortEarly: false
              });

            case 36:
              _ordemRepository = ordensRepository.create(_data);
              _context12.next = 39;
              return ordensRepository.save(_ordemRepository);

            case 39:
              return _context12.abrupt("return", response.json(_ordemRepository));

            case 42:
              return _context12.abrupt("return", response.status(createCliente.statusCode).json(createCliente.json));

            case 43:
              _context12.next = 46;
              break;

            case 45:
              return _context12.abrupt("return");

            case 46:
              _context12.next = 51;
              break;

            case 48:
              _context12.prev = 48;
              _context12.t0 = _context12["catch"](0);
              return _context12.abrupt("return", response.status(400).json({
                "Erro": _context12.t0
              }));

            case 51:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 48]]);
    }))();
  },
  //  MYCLIENTS
  userOrders: function userOrders(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var id, searchId, ordensRepository, ordens;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              id = request.params.id;
              searchId = parseInt(id);
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context13.next = 6;
              return ordensRepository.find({
                where: {
                  cd_id_ccli: searchId
                },
                relations: ['itens']
              });

            case 6:
              ordens = _context13.sent;

              if (!(ordens.length === 0)) {
                _context13.next = 11;
                break;
              }

              return _context13.abrupt("return", response.status(204).json({
                "Vazio": "Nenhuma Ordem Cadastrada"
              }));

            case 11:
              return _context13.abrupt("return", response.json(_ordem_view["default"].renderManyWithItens(ordens)));

            case 12:
              _context13.next = 17;
              break;

            case 14:
              _context13.prev = 14;
              _context13.t0 = _context13["catch"](0);
              return _context13.abrupt("return", response.status(400).json({
                "Erro": _context13.t0
              }));

            case 17:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 14]]);
    }))();
  },
  userSavedOrders: function userSavedOrders(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var id, searchId, ordensRepository, ordens;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              id = request.params.id;
              searchId = parseInt(id);
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context14.next = 6;
              return ordensRepository.find({
                where: [{
                  cd_id_ccli: searchId,
                  cd_habil_tipo: (0, _typeorm.LessThanOrEqual)(219)
                }],
                relations: ['itens'],
                order: {
                  cd_id: "DESC"
                }
              });

            case 6:
              ordens = _context14.sent;

              if (!(ordens.length === 0)) {
                _context14.next = 11;
                break;
              }

              return _context14.abrupt("return", response.status(204).json({
                "Vazio": "Nenhuma Ordem Salva"
              }));

            case 11:
              return _context14.abrupt("return", response.json(_ordem_view["default"].renderManyWithItens(ordens)));

            case 12:
              _context14.next = 17;
              break;

            case 14:
              _context14.prev = 14;
              _context14.t0 = _context14["catch"](0);
              return _context14.abrupt("return", response.status(400).json({
                "Erro": _context14.t0
              }));

            case 17:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[0, 14]]);
    }))();
  },
  userHystory: function userHystory(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var id, searchId, ordensRepository, ordens;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              id = request.params.id;
              searchId = parseInt(id);
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context15.next = 6;
              return ordensRepository.find({
                relations: ['itens'],
                where: [{
                  cd_id_ccli: searchId,
                  cd_habil_tipo: (0, _typeorm.MoreThan)(219)
                }],
                order: {
                  cd_id: "DESC"
                }
              });

            case 6:
              ordens = _context15.sent;

              if (!(ordens.length === 0)) {
                _context15.next = 11;
                break;
              }

              return _context15.abrupt("return", response.status(204).json({
                "Vazio": "Histórico Vazio"
              }));

            case 11:
              return _context15.abrupt("return", response.json(_ordem_view["default"].renderManyWithItens(ordens)));

            case 12:
              _context15.next = 17;
              break;

            case 14:
              _context15.prev = 14;
              _context15.t0 = _context15["catch"](0);
              return _context15.abrupt("return", response.status(400).json({
                "Erro": _context15.t0
              }));

            case 17:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[0, 14]]);
    }))();
  },
  historyPaid: function historyPaid(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var id, searchId, ordensRepository, ordens;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              id = request.params.id;
              searchId = parseInt(id);
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context16.next = 6;
              return ordensRepository.find({
                where: [{
                  cd_id_ccli: searchId,
                  cd_habil_tipo: (0, _typeorm.In)([220, 223, 224])
                }],
                order: {
                  cd_id: "DESC"
                }
              });

            case 6:
              ordens = _context16.sent;

              if (!(ordens.length === 0)) {
                _context16.next = 11;
                break;
              }

              return _context16.abrupt("return", response.status(204).json({
                "Vazio": "Histórico Vazio"
              }));

            case 11:
              return _context16.abrupt("return", response.json(_ordem_view["default"].renderMany(ordens)));

            case 12:
              _context16.next = 17;
              break;

            case 14:
              _context16.prev = 14;
              _context16.t0 = _context16["catch"](0);
              return _context16.abrupt("return", response.status(400).json({
                "Erro": _context16.t0
              }));

            case 17:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[0, 14]]);
    }))();
  },
  historyNotPaid: function historyNotPaid(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var id, searchId, ordensRepository, ordens;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              id = request.params.id;
              searchId = parseInt(id);
              ordensRepository = (0, _typeorm.getRepository)(_Ordem["default"]);
              _context17.next = 6;
              return ordensRepository.find({
                where: [{
                  cd_id_ccli: searchId,
                  cd_habil_tipo: (0, _typeorm.Between)(221, 222)
                }],
                order: {
                  cd_id: "DESC"
                }
              });

            case 6:
              ordens = _context17.sent;

              if (!(ordens.length === 0)) {
                _context17.next = 11;
                break;
              }

              return _context17.abrupt("return", response.status(204).json({
                "Vazio": "Histórico Vazio"
              }));

            case 11:
              return _context17.abrupt("return", response.json(_ordem_view["default"].renderMany(ordens)));

            case 12:
              _context17.next = 17;
              break;

            case 14:
              _context17.prev = 14;
              _context17.t0 = _context17["catch"](0);
              return _context17.abrupt("return", response.status(400).json({
                "Erro": _context17.t0
              }));

            case 17:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[0, 14]]);
    }))();
  }
  /*async pSeguro(request: Request, response: Response) {
    try {
        const { payload } = request.body;
      const { document } = request.params;
      const { header } = request.headers;
        const hash = createHash("sha256").update(`${payload}-${pagSegurotoken}`).digest('hex');
        console.log(header, document, payload);
      }catch(err) {
      return response.status(400).json({ "Erro": err });
    }
  }*/

};
exports["default"] = _default;