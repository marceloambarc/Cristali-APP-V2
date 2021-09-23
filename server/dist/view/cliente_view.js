"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  render: function render(cliente) {
    return {
      id: cliente.cd_pessoa,
      clientName: cliente.nm_nome,
      clientCgc: cliente.tx_cgc,
      clientPhone: cliente.tx_fone,
      clientEmail: cliente.tx_email,
      clientNotes: cliente.tx_obs,
      userCode: cliente.cd_id_ccli
    };
  },
  renderMany: function renderMany(clientes) {
    var _this = this;

    return clientes.map(function (cliente) {
      return _this.render(cliente);
    });
  }
};
exports["default"] = _default;