import Senha from "../models/Senha";
import clienteView from "./cliente_view";

export default {
  render(senha: Senha) {
    return {
      id: senha.id,
      isActive: senha.in_ativo,
      userCode: senha.cd_ccli,
      userName: senha.nm_nomecli,
      cgc: senha.tx_cgc
    };
  },

  renderWithClients(senha: Senha) {
    return {
      id: senha.id,
      isActive: senha.in_ativo,
      userCode: senha.cd_ccli,
      userName: senha.nm_nomecli,
      clientes: clienteView.render(senha.clientes)
    }
  },

  renderMany(senhas: Senha[]) {
    return senhas.map(senha => this.render(senha));
  }
}