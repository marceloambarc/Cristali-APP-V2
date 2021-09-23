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

var _Evento = _interopRequireDefault(require("../models/Evento"));

var _evento_view = _interopRequireDefault(require("../view/evento_view"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  index: function index(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var eventsRepository, events;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              eventsRepository = (0, _typeorm.getRepository)(_Evento["default"]);
              _context.next = 3;
              return eventsRepository.find();

            case 3:
              events = _context.sent;

              if (!(events.length === 0)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", response.status(204).json({
                "Vazio": "Nenhum Evento Cadastrado"
              }));

            case 8:
              return _context.abrupt("return", response.json(_evento_view["default"].renderMany(events)));

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
      var id, eventsRepository, event;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = request.params.id;
              eventsRepository = (0, _typeorm.getRepository)(_Evento["default"]);
              _context2.next = 4;
              return eventsRepository.findOneOrFail(id);

            case 4:
              event = _context2.sent;
              return _context2.abrupt("return", response.json(_evento_view["default"].render(event)));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  create: function create(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _request$body, userCode, eventDescription, userToken, deviceToken, eventsRepository, data, schema, eventRepository;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              /* CRIAR NOVO LOG DE EVENTOS
              VEM DO APP COMO { userCode, eventDescription, userToken, deviceToken }
              SAI PARA O BANCO { cd_ccli, tx_evento, token_cliente, token_celular }
                NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS 
              RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
              */
              _request$body = request.body, userCode = _request$body.userCode, eventDescription = _request$body.eventDescription, userToken = _request$body.userToken, deviceToken = _request$body.deviceToken;
              eventsRepository = (0, _typeorm.getRepository)(_Evento["default"]);
              data = {
                dt_evento: new Date(),
                cd_ccli: userCode,
                tx_evento: eventDescription,
                token_cliente: userToken,
                token_celular: deviceToken
              };
              schema = Yup.object().shape({
                dt_evento: Yup.date()["default"](function () {
                  return new Date();
                }),
                cd_ccli: Yup.string().required(),
                tx_evento: Yup.string().required(),
                token_cliente: Yup.string().required(),
                token_celular: Yup.string().required()
              });
              _context3.next = 7;
              return schema.validate(data, {
                abortEarly: false
              });

            case 7:
              eventRepository = eventsRepository.create(data);
              _context3.next = 10;
              return eventsRepository.save(eventRepository);

            case 10:
              return _context3.abrupt("return", response.status(201).json(eventRepository));

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
  }
};
exports["default"] = _default;