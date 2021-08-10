import OrdemPagamento from "../models/Ordempagamento";

export default {
  render(ordempay: OrdemPagamento) {
    return {
      id: ordempay.id,
      condition: ordempay.cd_habil_tipo,
      createdAt: ordempay.dt_evento,
      returnAt: ordempay.dt_retorno,
      totalPrice: ordempay.vl_total,
      clientToken: ordempay.token_cliente,
      codeDoc: ordempay.code_doc
    };
  },

  renderMany(ordempay: OrdemPagamento[]){
    return ordempay.map(p => this.render(p));
  }
}