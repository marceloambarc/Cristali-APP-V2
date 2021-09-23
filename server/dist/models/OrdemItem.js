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

var _Ordem = _interopRequireDefault(require("./Ordem"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

var Ordemitem = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = (0, _typeorm.Index)("ix_ordemitem2", {
  synchronize: false
}), _dec4 = Reflect.metadata("design:type", Number), _dec5 = (0, _typeorm.Column)("nvarchar", {
  length: 100
}), _dec6 = (0, _typeorm.Index)("ix_ordemitem3", {
  synchronize: false
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)("nvarchar", {
  length: 255
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)("numeric"), _dec11 = Reflect.metadata("design:type", Number), _dec12 = (0, _typeorm.Index)("ix_ordemitem1", {
  synchronize: false
}), _dec13 = (0, _typeorm.ManyToOne)(function () {
  return _Ordem["default"];
}, function (ordem) {
  return ordem.itens;
}, {
  onDelete: "CASCADE"
}), _dec14 = (0, _typeorm.JoinColumn)({
  name: 'cd_ordem_id'
}), _dec15 = Reflect.metadata("design:type", typeof _Ordem["default"] === "undefined" ? Object : _Ordem["default"]), _dec(_class = (_class2 = function Ordemitem() {
  (0, _classCallCheck2["default"])(this, Ordemitem);
  (0, _initializerDefineProperty2["default"])(this, "cd_id", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "nm_produto", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "cd_codigogerado", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "vl_preco", _descriptor4, this);
  (0, _initializerDefineProperty2["default"])(this, "ordem", _descriptor5, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_id", [_dec2, _dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "nm_produto", [_dec5, _dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_codigogerado", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "vl_preco", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "ordem", [_dec12, _dec13, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports["default"] = Ordemitem;