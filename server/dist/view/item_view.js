"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  render: function render(item) {
    return {
      orderId: item.ordem,
      id: item.cd_id,
      nm_produto: item.nm_produto,
      cd_codigogerado: item.cd_codigogerado,
      vl_preco: item.vl_preco
    };
  },
  renderMany: function renderMany(items) {
    var _this = this;

    return items.map(function (item) {
      return _this.render(item);
    });
  }
};
exports["default"] = _default;