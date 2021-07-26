import ClienteFinal from "../models/ClienteFinal";
import ordem_view from "./ordem_view"

export default {
  render(cliente: ClienteFinal) {
    return {
      id: cliente.CD_Pessoa,
      clientName: cliente.NM_Nome,
      clientPhone: cliente.TX_Fone,
      clientEmail: cliente.TX_email,
      clientNotes: cliente.TX_OBS,
    };
  },

  renderMany(clientes: ClienteFinal[]) {
    return clientes.map(cliente => this.render(cliente));
  }
}