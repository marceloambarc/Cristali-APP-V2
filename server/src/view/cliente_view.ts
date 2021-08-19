import Clientefinal from "../models/Clientefinal";

export default {
  render(cliente: Clientefinal) {
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

  renderMany(clientes: Clientefinal[]) {
    return clientes.map(cliente => this.render(cliente));
  }
}