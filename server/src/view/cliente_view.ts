import Clientefinal from "../models/Clientefinal";
import ordem_view from "./ordem_view"

export default {
  render(cliente: Clientefinal) {
    return {
      id: cliente.cd_pessoa,
      clientName: cliente.nm_nome,
      clientPhone: cliente.tx_fone,
      clientEmail: cliente.tx_email,
      clientNotes: cliente.tx_obs,
    };
  },

  renderMany(clientes: Clientefinal[]) {
    return clientes.map(cliente => this.render(cliente));
  }
}