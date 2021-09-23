"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _item_view = _interopRequireDefault(require("./item_view"));

var _default = {
  render: function render(ordem) {
    return {
      id: ordem.cd_id,
      userCode: ordem.cd_clientefinal,
      createdAt: ordem.dt_criado,
      totalPrice: ordem.vl_total,
      orderNotes: ordem.tx_obs,
      condition: ordem.cd_habil_tipo,
      clientCode: ordem.cd_clientefinal
    };
  },
  renderWithItens: function renderWithItens(ordem) {
    return {
      id: ordem.cd_id,
      userCode: ordem.cd_id_ccli,
      createdAt: ordem.dt_criado,
      totalPrice: ordem.vl_total,
      orderNotes: ordem.tx_obs,
      condition: ordem.cd_habil_tipo,
      clientCode: ordem.cd_clientefinal,
      itens: _item_view["default"].renderMany(ordem.itens)
    };
  },
  renderMany: function renderMany(ordens) {
    var _this = this;

    return ordens.map(function (ordem) {
      return _this.render(ordem);
    });
  },
  renderManyWithItens: function renderManyWithItens(ordens) {
    var _this2 = this;

    return ordens.map(function (ordem) {
      return _this2.renderWithItens(ordem);
    });
  }
};
exports["default"] = _default;