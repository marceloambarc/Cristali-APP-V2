import Ordem from "../models/Ordem";
import itemView from "./item_view";

export default {
  render(ordem: Ordem) {
    return {
      id: ordem.cd_id,
      userCode: ordem.cd_id_ccli,
      createdAt: new Date(ordem.dt_criado),
      totalPrice: ordem.vl_total,
      orderNotes: ordem.tx_obs,
      condition: ordem.cd_habil_tipo,
      clientCode: ordem.cd_clientefinal,
      orderReference: ordem.tx_referencia,
    }
  },

  renderWithItens(ordem: Ordem) {
    return {
      id: ordem.cd_id,
      userCode: ordem.cd_id_ccli,
      createdAt: new Date(ordem.dt_criado),
      totalPrice: ordem.vl_total,
      orderNotes: ordem.tx_obs,
      condition: ordem.cd_habil_tipo,
      clientCode: ordem.cd_clientefinal,
      orderReference: ordem.tx_referencia,
      itens: itemView.renderMany(ordem.itens)
    };
  },

  renderMany(ordens: Ordem[]) {
    return ordens.map(ordem => this.render(ordem));
  },

  renderManyWithItens(ordens: Ordem[]) {
    return ordens.map(ordem => this.renderWithItens(ordem));
  }
}