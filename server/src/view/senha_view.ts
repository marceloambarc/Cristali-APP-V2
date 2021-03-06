import Senha from "../models/Senha";

export default {
  render(senha: Senha) {
    return {
      id: senha.id,
      isActive: senha.in_ativo,
      userCode: senha.cd_ccli,
      userName: senha.nm_nomecli,
      cgc: senha.tx_cgc,
    };
  },

  renderMany(senhas: Senha[]) {
    return senhas.map(senha => this.render(senha));
  }
}