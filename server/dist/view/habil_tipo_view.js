"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  render: function render(habilTipo) {
    return {
      id: habilTipo.cd_tipo,
      description: habilTipo.ds_tipo,
      type: habilTipo.tp_tipo,
      obs: habilTipo.tx_obs,
      refCode: habilTipo.cd_referencia
    };
  },
  renderMany: function renderMany(habilTipos) {
    var _this = this;

    return habilTipos.map(function (habilTipo) {
      return _this.render(habilTipo);
    });
  }
};
exports["default"] = _default;