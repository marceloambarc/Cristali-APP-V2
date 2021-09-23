"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  render: function render(senha) {
    return {
      id: senha.id,
      isActive: senha.in_ativo,
      userCode: senha.cd_ccli,
      userName: senha.nm_nomecli,
      cgc: senha.tx_cgc
    };
  },
  renderMany: function renderMany(senhas) {
    var _this = this;

    return senhas.map(function (senha) {
      return _this.render(senha);
    });
  }
};
exports["default"] = _default;