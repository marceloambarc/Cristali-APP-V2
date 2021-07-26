import Token from "../models/Token";

export default {
  render(token: Token) {
    return {
      id: token.id,
      deviceToken: token.Token_Celular,
      createdAt: token.DT_Criado,
      updatedAt: token.DT_Modificado
    };
  },

  renderMany(tokens: Token[]) {
    return tokens.map(token => this.render(token));
  }
}