import Ordem from "../models/Ordem";

export default {
  render(ordem: Ordem) {
    return {
      id: ordem.CD_ID,
      userCode: ordem.CD_ID_ccli,
      clientCode: ordem.CD_ClienteFinal,
      createdAt: ordem.DT_Criado,
      totalPrice: ordem.VL_Total,
      orderNotes: ordem.TX_OBS,
      condition: ordem.CD_HABIL_TIPO
    }
  }
}