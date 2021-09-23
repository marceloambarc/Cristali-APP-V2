"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  render: function render(token) {
    return {
      id: token.id,
      token_celular: token.token_celular,
      dt_criado: token.dt_criado,
      dt_modificado: token.dt_modificado
    };
  },
  renderMany: function renderMany(tokens) {
    var _this = this;

    return tokens.map(function (token) {
      return _this.render(token);
    });
  }
};
exports["default"] = _default;