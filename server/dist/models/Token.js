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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var Token = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Index)("ix_token1", {
  synchronize: false
}), _dec5 = (0, _typeorm.Column)("nvarchar", {
  length: 255
}), _dec6 = Reflect.metadata("design:type", String), _dec7 = (0, _typeorm.Column)("datetime"), _dec8 = (0, _typeorm.Index)("ix_token2", {
  synchronize: false
}), _dec9 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec10 = (0, _typeorm.Column)("datetime"), _dec11 = (0, _typeorm.Index)("ix_token3", {
  synchronize: false
}), _dec12 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = function Token() {
  (0, _classCallCheck2["default"])(this, Token);
  (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "token_celular", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "dt_criado", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "dt_modificado", _descriptor4, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "token_celular", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "dt_criado", [_dec7, _dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "dt_modificado", [_dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports["default"] = Token;