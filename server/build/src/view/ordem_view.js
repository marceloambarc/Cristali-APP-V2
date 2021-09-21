"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_view_1 = __importDefault(require("./item_view"));
exports.default = {
    render(ordem) {
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
    renderWithItens(ordem) {
        return {
            id: ordem.cd_id,
            userCode: ordem.cd_id_ccli,
            createdAt: ordem.dt_criado,
            totalPrice: ordem.vl_total,
            orderNotes: ordem.tx_obs,
            condition: ordem.cd_habil_tipo,
            clientCode: ordem.cd_clientefinal,
            itens: item_view_1.default.renderMany(ordem.itens)
        };
    },
    renderMany(ordens) {
        return ordens.map(ordem => this.render(ordem));
    },
    renderManyWithItens(ordens) {
        return ordens.map(ordem => this.renderWithItens(ordem));
    }
};
