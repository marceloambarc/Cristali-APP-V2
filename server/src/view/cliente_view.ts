import Clientefinal from "../models/Clientefinal";
import ordemView from "./ordem_view"

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

  renderWithOrder(cliente: Clientefinal) {
    return {
      id: cliente.cd_pessoa,
      clientName: cliente.nm_nome,
      clientPhone: cliente.tx_fone,
      clientEmail: cliente.tx_email,
      clientNotes: cliente.tx_obs,
      ordens: ordemView.renderMany(cliente.ordens)
    }
  },

  renderMany(clientes: Clientefinal[]) {
    return clientes.map(cliente => this.render(cliente));
  }
}