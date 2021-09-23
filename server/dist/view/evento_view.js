"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  render: function render(event) {
    return {
      id: event.id_evento,
      createdAt: event.dt_evento,
      userCode: event.cd_ccli,
      eventDescription: event.tx_evento,
      userToken: event.token_cliente,
      deviceToken: event.token_celular
    };
  },
  renderMany: function renderMany(events) {
    var _this = this;

    return events.map(function (event) {
      return _this.render(event);
    });
  }
};
exports["default"] = _default;