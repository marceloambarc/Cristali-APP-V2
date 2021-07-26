import HABIL_TIPO from "../models/HABIL_TIPO";

export default {
  render(habilTipo: HABIL_TIPO) {
    return {
      id: habilTipo.CD_TIPO,
      description: habilTipo.DS_TIPO,
      type: habilTipo.TP_TIPO,
      obs: habilTipo.TX_OBS,
      refCode: habilTipo.CD_REFERENCIA
    };
  },

  renderMany(habilTipos: HABIL_TIPO[]) {
    return habilTipos.map(habilTipo => this.render(habilTipo));
  }
}