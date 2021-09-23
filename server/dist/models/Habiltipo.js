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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

var Habiltipo = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Column)("nvarchar", {
  length: 100
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)("smallint"), _dec7 = Reflect.metadata("design:type", Number), _dec8 = (0, _typeorm.Column)("ntext"), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)('smallint'), _dec11 = Reflect.metadata("design:type", Number), _dec(_class = (_class2 = function Habiltipo() {
  (0, _classCallCheck2["default"])(this, Habiltipo);
  (0, _initializerDefineProperty2["default"])(this, "cd_tipo", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "ds_tipo", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "tp_tipo", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "tx_obs", _descriptor4, this);
  (0, _initializerDefineProperty2["default"])(this, "cd_referencia", _descriptor5, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_tipo", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "ds_tipo", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tp_tipo", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tx_obs", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cd_referencia", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports["default"] = Habiltipo;