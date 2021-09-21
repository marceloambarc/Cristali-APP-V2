import OrdemItem from "../models/OrdemItem";

export default {
  render(item: OrdemItem) {
    return {
      orderId: item.ordem,
      id: item.cd_id,
      nm_produto: item.nm_produto,
      cd_codigogerado: item.cd_codigogerado,
      vl_preco: item.vl_preco
    };
  },

  renderMany(items: OrdemItem[]){
    return items.map(item => this.render(item));
  }
}