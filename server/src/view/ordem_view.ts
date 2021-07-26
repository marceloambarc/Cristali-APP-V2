import Ordem from "../models/Ordem";

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
  }
}