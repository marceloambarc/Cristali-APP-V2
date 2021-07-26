import Token from "../models/Token";

export default {
  render(token: Token) {
    return {
      id: token.id,
      token_celular: token.token_celular,
      dt_criado: token.dt_criado,
      dt_modificado: token.dt_modificado
    };
  },

  renderMany(tokens: Token[]) {
    return tokens.map(token => this.render(token));
  }
}