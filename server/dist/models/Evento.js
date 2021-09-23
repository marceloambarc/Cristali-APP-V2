"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeorm = require("typeorm");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

var Evento = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Index)('ix_evento1', {
  synchronize: false
}), _dec5 = (0, _typeorm.Column)("datetime"), _dec6 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec7 = (0, _typeorm.Column)("nvarchar", {
  length: 6
}), _dec8 = (0, _typeorm.Index)('ix_evento2', {
  synchronize: false
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)("nvarchar", {
  length: 250
}), _dec11 = (0, _typeorm.Index)('ix_evento3', {
  synchronize: false
}), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.Column)("nvarchar", {
  length: 250
}), _dec14 = Reflect.metadata("design:type", String), _dec15 = (0, _typeorm.Column)("nvarchar", {
  length: 250
}), _dec16 = Reflect.metadata("design:type", String), _dec(_class = (_class2 = function Evento() {
  (0, _classCallCheck2["default"])(this, Evento);
  (0, _initializerDefineProperty2["default"])(this, "id_evento", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "dt_evento", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "cd_ccli", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_evento", _descriptor4, this);
  (0, _initializerDefineProperty2["default"])(this, "token_cliente", _descriptor5, this);
  (0, _initializerDefineProperty2["default"])(this, "token_celular", _descriptor6, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id_evento", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "dt_evento", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_ccli", [_dec7, _dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_evento", [_dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "token_cliente", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "token_celular", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports["default"] = Evento;