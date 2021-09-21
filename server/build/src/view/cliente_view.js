"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(cliente) {
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
    renderMany(clientes) {
        return clientes.map(cliente => this.render(cliente));
    }
};
