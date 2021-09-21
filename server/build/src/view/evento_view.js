"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(event) {
        return {
            id: event.id_evento,
            createdAt: event.dt_evento,
            userCode: event.cd_ccli,
            eventDescription: event.tx_evento,
            userToken: event.token_cliente,
            deviceToken: event.token_celular
        };
    },
    renderMany(events) {
        return events.map(event => this.render(event));
    }
};
