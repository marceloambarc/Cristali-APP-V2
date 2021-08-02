import Ordem from "../models/Ordem";
import itemView from "./item_view";
import ordempagamentoView from "./ordempagamento_view";

export default {
  render(ordem: Ordem) {
    return {
      id: ordem.cd_id,
      userCode: ordem.cd_id_ccli,
      createdAt: ordem.dt_criado,
      totalPrice: ordem.vl_total,
      orderNotes: ordem.tx_obs,
      condition: ordem.cd_habil_tipo,
    }
  },

  renderWithItens(ordem: Ordem) {
    return {
      id: ordem.cd_id,
      userCode: ordem.cd_id_ccli,
      createdAt: ordem.dt_criado,
      totalPrice: ordem.vl_total,
      orderNotes: ordem.tx_obs,
      condition: ordem.cd_habil_tipo,
      itens: itemView.renderMany(ordem.itens)
    };
  },

  renderPayment(ordem: Ordem) {
    return {
      condition: ordem.cd_habil_tipo,
      payment: ordempagamentoView.renderMany(ordem.ordem_pagamento)
    }
  },

  renderMany(ordens: Ordem[]) {
    return ordens.map(ordem => this.render(ordem));
  },

  renderManyWithItens(ordens: Ordem[]) {
    return ordens.map(ordem => this.renderWithItens(ordem));
  }
}