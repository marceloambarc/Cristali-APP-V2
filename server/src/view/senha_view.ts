import Senha from "../models/Senha";

export default {
  render(senha: Senha) {
    return {
      id: senha.ID,
      isActive: senha.IN_Ativo,
      password: senha.TX_Senha,
      userCode: senha.CD_ccli,
      userName: senha.NM_nomecli,
      cgc: senha.TX_CGC 
    };
  },

  renderMany(senhas: Senha[]) {
    return senhas.map(senha => this.render(senha));
  }
}