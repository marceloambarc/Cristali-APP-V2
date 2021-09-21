"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(habilTipo) {
        return {
            id: habilTipo.cd_tipo,
            description: habilTipo.ds_tipo,
            type: habilTipo.tp_tipo,
            obs: habilTipo.tx_obs,
            refCode: habilTipo.cd_referencia
        };
    },
    renderMany(habilTipos) {
        return habilTipos.map(habilTipo => this.render(habilTipo));
    }
};
