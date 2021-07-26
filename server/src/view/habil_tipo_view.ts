import Habiltipo from "../models/Habiltipo";

export default {
  render(habilTipo: Habiltipo) {
    return {
      id: habilTipo.cd_tipo,
      description: habilTipo.ds_tipo,
      type: habilTipo.tp_tipo,
      obs: habilTipo.tx_obs,
      refCode: habilTipo.cd_referencia
    };
  },

  renderMany(habilTipos: Habiltipo[]) {
    return habilTipos.map(habilTipo => this.render(habilTipo));
  }
}