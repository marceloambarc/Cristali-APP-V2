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

var _OrdemItem = _interopRequireDefault(require("./OrdemItem"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var Ordem = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Index)("ix_ordem1", {
  synchronize: false
}), _dec5 = (0, _typeorm.Column)("nvarchar", {
  length: 6
}), _dec6 = Reflect.metadata("design:type", String), _dec7 = (0, _typeorm.Column)("datetime"), _dec8 = (0, _typeorm.Index)("ix_ordem3", {
  synchronize: false
}), _dec9 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec10 = (0, _typeorm.Column)("nvarchar", {
  length: 255
}), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)("nvarchar", {
  length: 255
}), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.Column)(), _dec15 = (0, _typeorm.Index)("ix_ordem4", {
  synchronize: false
}), _dec16 = Reflect.metadata("design:type", Number), _dec17 = (0, _typeorm.Column)(), _dec18 = Reflect.metadata("design:type", Number), _dec19 = (0, _typeorm.OneToMany)(function () {
  return _OrdemItem["default"];
}, function (item) {
  return item.ordem;
}, {
  cascade: ['insert', 'update']
}), _dec20 = (0, _typeorm.JoinColumn)({
  name: 'cd_ordem_id'
}), _dec21 = Reflect.metadata("design:type", Array), _dec(_class = (_class2 = function Ordem() {
  (0, _classCallCheck2["default"])(this, Ordem);
  (0, _initializerDefineProperty2["default"])(this, "cd_id", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "cd_id_ccli", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "dt_criado", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "vl_total", _descriptor4, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_obs", _descriptor5, this);
  (0, _initializerDefineProperty2["default"])(this, "cd_habil_tipo", _descriptor6, this);
  (0, _initializerDefineProperty2["default"])(this, "cd_clientefinal", _descriptor7, this);
  (0, _initializerDefineProperty2["default"])(this, "itens", _descriptor8, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_id_ccli", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "dt_criado", [_dec7, _dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "vl_total", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_obs", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_habil_tipo", [_dec14, _dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_clientefinal", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "itens", [_dec19, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports["default"] = Ordem;