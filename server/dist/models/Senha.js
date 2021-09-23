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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

var Senha = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Index)("ix_senha1", {
  synchronize: false
}), _dec5 = (0, _typeorm.Column)(), _dec6 = Reflect.metadata("design:type", Number), _dec7 = (0, _typeorm.Column)("nvarchar", {
  length: 255
}), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeorm.Column)("nvarchar", {
  length: 6
}), _dec10 = (0, _typeorm.Index)("ix_senha2", {
  synchronize: false
}), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)("nvarchar", {
  length: 100
}), _dec13 = (0, _typeorm.Index)("ix_senha3", {
  synchronize: false
}), _dec14 = Reflect.metadata("design:type", String), _dec15 = (0, _typeorm.Column)("nvarchar", {
  length: 14
}), _dec16 = (0, _typeorm.Index)("ix_senha4", {
  synchronize: false
}), _dec17 = Reflect.metadata("design:type", String), _dec(_class = (_class2 = function Senha() {
  (0, _classCallCheck2["default"])(this, Senha);
  (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "in_ativo", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_senha", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "cd_ccli", _descriptor4, this);
  (0, _initializerDefineProperty2["default"])(this, "nm_nomecli", _descriptor5, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_cgc", _descriptor6, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "in_ativo", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_senha", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_ccli", [_dec9, _dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "nm_nomecli", [_dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_cgc", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports["default"] = Senha;