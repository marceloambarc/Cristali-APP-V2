import Ordemreserva from "../models/OrdemReserva";
import itemReservaView from "./itemreserva_view";

export default {
  render(ordemreserva: Ordemreserva) {
    return {
      id: ordemreserva.cd_id,
      userCode: ordemreserva.cd_id_ccli,
      createdAt: ordemreserva.dt_criado,
      totalPrice: ordemreserva.vl_total,
      orderNotes: ordemreserva.tx_obs,
      condition: ordemreserva.cd_habil_tipo,
      clientCode: ordemreserva.cd_clientefinal,
      reference: ordemreserva.tx_referencia,
    }
  },

  renderWithItens(ordemreserva: Ordemreserva) {
    return {
      id: ordemreserva.cd_id,
      userCode: ordemreserva.cd_id_ccli,
      createdAt: ordemreserva.dt_criado,
      totalPrice: ordemreserva.vl_total,
      orderNotes: ordemreserva.tx_obs,
      condition: ordemreserva.cd_habil_tipo,
      clientCode: ordemreserva.cd_clientefinal,
      reference: ordemreserva.tx_referencia,
      itens: itemReservaView.renderMany(ordemreserva.itens)
    };
  },

  renderMany(ordensreserva: Ordemreserva[]) {
    return ordensreserva.map(ordem => this.render(ordem));
  },

  renderManyWithItens(ordensreserva: Ordemreserva[]) {
    return ordensreserva.map(ordem => this.renderWithItens(ordem));
  }
}