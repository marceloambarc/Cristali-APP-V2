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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

var Clientefinal = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)({
  name: "PK_clientefinal"
}), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Index)("ix_clientefinal1", {
  synchronize: false
}), _dec5 = (0, _typeorm.Column)("nvarchar", {
  length: 100
}), _dec6 = Reflect.metadata("design:type", String), _dec7 = (0, _typeorm.Column)("nvarchar", {
  length: 14
}), _dec8 = (0, _typeorm.Index)("ix_clientefinal2", {
  synchronize: false
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)("nvarchar", {
  length: 14
}), _dec11 = (0, _typeorm.Index)("ix_clientefinal3", {
  synchronize: false
}), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.Column)("nvarchar", {
  length: 100
}), _dec14 = Reflect.metadata("design:type", String), _dec15 = (0, _typeorm.Column)("nvarchar", {
  length: 200
}), _dec16 = (0, _typeorm.Index)("ix_clientefinal4", {
  synchronize: false
}), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.Index)("ix_clientefinal5", {
  synchronize: false
}), _dec19 = (0, _typeorm.Column)("nvarchar", {
  length: 6
}), _dec20 = Reflect.metadata("design:type", String), _dec(_class = (_class2 = function Clientefinal() {
  (0, _classCallCheck2["default"])(this, Clientefinal);
  (0, _initializerDefineProperty2["default"])(this, "cd_pessoa", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "nm_nome", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_cgc", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_fone", _descriptor4, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_email", _descriptor5, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_obs", _descriptor6, this);
  (0, _initializerDefineProperty2["default"])(this, "cd_id_ccli", _descriptor7, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_pessoa", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "nm_nome", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_cgc", [_dec7, _dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_fone", [_dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_email", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_obs", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_id_ccli", [_dec18, _dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports["default"] = Clientefinal;