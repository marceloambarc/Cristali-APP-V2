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

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var Yup = _interopRequireWildcard(require("yup"));

var _credentials = require("../../credentials");

var _Senha = _interopRequireDefault(require("../models/Senha"));

var _senha_view = _interopRequireDefault(require("../view/senha_view"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  index: function index(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var senhasRepository, senhas;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context.next = 3;
              return senhasRepository.find();

            case 3:
              senhas = _context.sent;

              if (!(senhas.length === 0)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", response.status(204).json({
                "Vazio": "Nenhum Usuário Cadastrado."
              }));

            case 8:
              return _context.abrupt("return", response.json(_senha_view["default"].renderMany(senhas)));

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
      var cgc, searchCgc, senhasRepository, existSenha;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              cgc = request.params.cgc;
              searchCgc = String(cgc);
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context2.next = 6;
              return senhasRepository.find({
                where: {
                  tx_cgc: searchCgc
                }
              });

            case 6:
              existSenha = _context2.sent;

              if (!(existSenha.length > 1)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", response.json(_senha_view["default"].renderMany(existSenha)));

            case 11:
              return _context2.abrupt("return", response.status(400).json({
                "Erro": 'Mais de um usuário.'
              }));

            case 12:
              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", response.status(400).json({
                "Erro": _context2.t0
              }));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 14]]);
    }))();
  },
  login: function login(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _request$body, cgc, password, senhasRepository, senha, isPasswordRight;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _request$body = request.body, cgc = _request$body.cgc, password = _request$body.password;
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context3.next = 4;
              return senhasRepository.findOne({
                "tx_cgc": cgc
              });

            case 4:
              senha = _context3.sent;

              if (!(senha === undefined)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", response.status(403).send({
                "Erro": "Usuário não Cadastrado"
              }));

            case 9:
              _context3.next = 11;
              return _bcrypt["default"].compare(password, senha.tx_senha);

            case 11:
              isPasswordRight = _context3.sent;

              if (isPasswordRight) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", response.status(419).json({
                "Erro": "Senha Incorreta"
              }));

            case 16:
              if (!(senha.in_ativo === 0)) {
                _context3.next = 20;
                break;
              }

              return _context3.abrupt("return", response.status(406).json({
                "Erro": "Usuário não ativo."
              }));

            case 20:
              _jsonwebtoken["default"].sign({
                cgc: cgc,
                id: senha.id,
                isActive: senha.in_ativo,
                userName: senha.nm_nomecli
              }, _credentials.JWTSecretUser, {
                expiresIn: '1h'
              }, function (err, token) {
                if (err) {
                  return response.status(401).json({
                    "Ops": "A sua Sessão Terminou, Faça Login Novamente"
                  });
                } else {
                  return response.status(200).json({
                    "token": token,
                    "user": _senha_view["default"].render(senha)
                  });
                }
              });

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  hashPasswords: function hashPasswords(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var password, senhasRepository, senha;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              password = request.body.password;
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context5.next = 5;
              return senhasRepository.find();

            case 5:
              senha = _context5.sent;

              if (!(password === _credentials.SegundaSenha)) {
                _context5.next = 9;
                break;
              }

              senha.forEach( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(user) {
                  var password, generatedSalt, hash;
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          password = user.tx_senha;
                          _context4.next = 3;
                          return _bcrypt["default"].genSalt(_credentials.salt);

                        case 3:
                          generatedSalt = _context4.sent;
                          _context4.next = 6;
                          return _bcrypt["default"].hash(password, generatedSalt);

                        case 6:
                          hash = _context4.sent;
                          user.tx_senha = hash;
                          _context4.next = 10;
                          return senhasRepository.save(user);

                        case 10:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());
              return _context5.abrupt("return", response.status(200).json({
                "OK!": "Senhas criptografadas."
              }));

            case 9:
              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", response.status(401).json({
                "Senha Incorreta": "Entre em contato com o Suporte"
              }));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 11]]);
    }))();
  },
  resetPassword: function resetPassword(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _request$body2, password, userCgc, searchUserCgc, senhasRepository, existSenha, newPassword, generatedSalt, hash;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _request$body2 = request.body, password = _request$body2.password, userCgc = _request$body2.userCgc;

              if (!(password === _credentials.SegundaSenha)) {
                _context6.next = 25;
                break;
              }

              searchUserCgc = String(userCgc);
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context6.next = 7;
              return senhasRepository.findOne({
                where: {
                  tx_cgc: searchUserCgc
                }
              });

            case 7:
              existSenha = _context6.sent;

              if (!(existSenha === undefined)) {
                _context6.next = 12;
                break;
              }

              return _context6.abrupt("return", response.status(404).json({
                "Erro": "Usuário não existe"
              }));

            case 12:
              newPassword = userCgc;
              _context6.next = 15;
              return _bcrypt["default"].genSalt(_credentials.salt);

            case 15:
              generatedSalt = _context6.sent;
              _context6.next = 18;
              return _bcrypt["default"].hash(newPassword, generatedSalt);

            case 18:
              hash = _context6.sent;
              existSenha.tx_senha = hash;
              _context6.next = 22;
              return senhasRepository.save(existSenha);

            case 22:
              return _context6.abrupt("return", response.status(202).json(_senha_view["default"].render(existSenha)));

            case 23:
              _context6.next = 26;
              break;

            case 25:
              return _context6.abrupt("return", response.status(400).json({
                "Erro": "Código Errado."
              }));

            case 26:
              _context6.next = 31;
              break;

            case 28:
              _context6.prev = 28;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", response.status(400).json({
                "Erro": _context6.t0
              }));

            case 31:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 28]]);
    }))();
  },
  changePassword: function changePassword(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _request$body3, userCode, oldPassword, newPassword, searchUserCode, senhasRepository, existSenha, isPasswordRight, generatedSalt, hash;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _request$body3 = request.body, userCode = _request$body3.userCode, oldPassword = _request$body3.oldPassword, newPassword = _request$body3.newPassword;
              console.log(request.body);
              searchUserCode = String(userCode);
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context7.next = 7;
              return senhasRepository.findOne({
                where: {
                  cd_ccli: searchUserCode
                }
              });

            case 7:
              existSenha = _context7.sent;

              if (!(existSenha === undefined)) {
                _context7.next = 12;
                break;
              }

              return _context7.abrupt("return", response.status(404).json({
                "Erro": "Usuário não existe"
              }));

            case 12:
              _context7.next = 14;
              return _bcrypt["default"].compare(oldPassword, existSenha.tx_senha);

            case 14:
              isPasswordRight = _context7.sent;

              if (isPasswordRight) {
                _context7.next = 19;
                break;
              }

              return _context7.abrupt("return", response.status(419).json({
                "Erro": "Senha Atual Incorreta ".concat(existSenha.nm_nomecli)
              }));

            case 19:
              _context7.next = 21;
              return _bcrypt["default"].genSalt(_credentials.salt);

            case 21:
              generatedSalt = _context7.sent;
              _context7.next = 24;
              return _bcrypt["default"].hash(newPassword, generatedSalt);

            case 24:
              hash = _context7.sent;
              existSenha.tx_senha = hash;
              _context7.next = 28;
              return senhasRepository.save(existSenha);

            case 28:
              return _context7.abrupt("return", response.status(202).json(_senha_view["default"].render(existSenha)));

            case 29:
              _context7.next = 34;
              break;

            case 31:
              _context7.prev = 31;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", response.status(400).json({
                "Erro": _context7.t0
              }));

            case 34:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 31]]);
    }))();
  },
  "switch": function _switch(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var cgc, isActive, setIsActive, senhasRepository, existSenha, editedSenha;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              cgc = request.params.cgc;
              isActive = request.body.isActive;
              setIsActive = parseInt(isActive);
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context8.next = 7;
              return senhasRepository.findOne({
                where: [{
                  tx_cgc: cgc
                }]
              });

            case 7:
              existSenha = _context8.sent;

              if (!(existSenha != undefined)) {
                _context8.next = 19;
                break;
              }

              _context8.next = 11;
              return senhasRepository.update(existSenha, {
                "in_ativo": setIsActive
              });

            case 11:
              editedSenha = _context8.sent;

              if (!editedSenha) {
                _context8.next = 16;
                break;
              }

              return _context8.abrupt("return", response.status(202).json(_senha_view["default"].render(existSenha)));

            case 16:
              return _context8.abrupt("return", response.status(400).json({
                "Erro": "Não foi possível editar Usuário."
              }));

            case 17:
              _context8.next = 20;
              break;

            case 19:
              return _context8.abrupt("return", response.status(404).json({
                "Erro": "Usuário não Encontrado."
              }));

            case 20:
              _context8.next = 25;
              break;

            case 22:
              _context8.prev = 22;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", response.status(400).json({
                err: _context8.t0
              }));

            case 25:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 22]]);
    }))();
  },
  edit: function edit(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var cgc, searchCgc, userName, senhasRepository, existSenha;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              cgc = request.params.cgc;
              searchCgc = String(cgc);
              userName = request.body.userName;
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context9.next = 7;
              return senhasRepository.findOne({
                where: {
                  tx_cgc: searchCgc
                }
              });

            case 7:
              existSenha = _context9.sent;

              if (!(existSenha === undefined)) {
                _context9.next = 12;
                break;
              }

              return _context9.abrupt("return", response.status(404).json({
                "Erro": "Cadastro não Existe!"
              }));

            case 12:
              if (!(userName === '')) {
                _context9.next = 16;
                break;
              }

              return _context9.abrupt("return", response.status(411).json({
                "Erro": "Insira o Nome do Usuário."
              }));

            case 16:
              existSenha.nm_nomecli = userName;
              _context9.next = 19;
              return senhasRepository.save(existSenha);

            case 19:
              return _context9.abrupt("return", response.status(200).json(existSenha));

            case 20:
              _context9.next = 25;
              break;

            case 22:
              _context9.prev = 22;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", response.status(400).json({
                "Erro": _context9.t0
              }));

            case 25:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 22]]);
    }))();
  },
  "delete": function _delete(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var cgc, searchCgc, senhasRepository, existSenha;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              cgc = request.params.cgc;
              searchCgc = String(cgc);
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context10.next = 6;
              return senhasRepository.findOne({
                where: {
                  tx_cgc: searchCgc
                }
              });

            case 6:
              existSenha = _context10.sent;

              if (!(existSenha === undefined)) {
                _context10.next = 11;
                break;
              }

              return _context10.abrupt("return", response.status(404).json({
                "Erro": "Usuário não Encontrado"
              }));

            case 11:
              _context10.next = 13;
              return senhasRepository.remove(existSenha);

            case 13:
              return _context10.abrupt("return", response.status(200));

            case 14:
              _context10.next = 19;
              break;

            case 16:
              _context10.prev = 16;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", response.status(400).json({
                "Erro": _context10.t0
              }));

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 16]]);
    }))();
  },
  create: function create(request, response) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var _request$body4, secret, userCode, userName, cgc, senhasRepository, existSenha, saltEncriypted, hash, data, schema, senhaRepository;

      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;

              /* CRIAR NOVO USUÁRIO DA APLICAÇÃO
              VEM DO APP COMO { password, userCode, userName, cgc }
              SAI PARA O BANCO { tx_senha, cd_ccli, nm_nomecli, tx_cgc }
                NOMENCLATURAS PARA MELHOR VISUALIZAÇÃO DOS CÓDIGOS EM SEUS 
              RESPECTIVOS AMBIENTES (REACT-NATIVE => APP  || api || SQL => BANCO DE DADOS)
              */
              _request$body4 = request.body, secret = _request$body4.secret, userCode = _request$body4.userCode, userName = _request$body4.userName, cgc = _request$body4.cgc;
              console.log(secret);

              if (!(secret === _credentials.SegundaSenha)) {
                _context11.next = 32;
                break;
              }

              if (!(userCode === '' || userName === '' || cgc === '')) {
                _context11.next = 8;
                break;
              }

              return _context11.abrupt("return", response.status(400).json({
                "Erro": "O parâmetro não pode ser vazio."
              }));

            case 8:
              senhasRepository = (0, _typeorm.getRepository)(_Senha["default"]);
              _context11.next = 11;
              return senhasRepository.findOne({
                where: {
                  tx_cgc: cgc
                }
              });

            case 11:
              existSenha = _context11.sent;

              if (!(existSenha === undefined)) {
                _context11.next = 29;
                break;
              }

              _context11.next = 15;
              return _bcrypt["default"].genSalt(_credentials.salt);

            case 15:
              saltEncriypted = _context11.sent;
              _context11.next = 18;
              return _bcrypt["default"].hash(cgc, saltEncriypted);

            case 18:
              hash = _context11.sent;
              data = {
                in_ativo: 0,
                tx_senha: hash,
                cd_ccli: userCode,
                nm_nomecli: userName,
                tx_cgc: cgc
              };
              schema = Yup.object().shape({
                in_ativo: Yup.number().required(),
                tx_senha: Yup.string().required(),
                cd_ccli: Yup.string().required(),
                nm_nomecli: Yup.string().required(),
                tx_cgc: Yup.string().required()
              });
              _context11.next = 23;
              return schema.validate(data, {
                abortEarly: false
              });

            case 23:
              _context11.next = 25;
              return senhasRepository.insert(data);

            case 25:
              senhaRepository = _context11.sent;
              return _context11.abrupt("return", response.status(201).json(senhaRepository));

            case 29:
              return _context11.abrupt("return", response.status(409).json({
                "Ops!": "CPF já Cadastrado."
              }));

            case 30:
              _context11.next = 33;
              break;

            case 32:
              return _context11.abrupt("return", response.status(400).json({
                "Erro": "Código Errado."
              }));

            case 33:
              _context11.next = 38;
              break;

            case 35:
              _context11.prev = 35;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", response.status(400).json({
                "Erro": _context11.t0
              }));

            case 38:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 35]]);
    }))();
  }
};
exports["default"] = _default;