import OrdemItem from "../models/Ordemitem";

export default {
  render(item: OrdemItem) {
    return {
      orderId: item.ordem,
      id: item.cd_id,
      productName: item.nm_produto,
      gCode: item.cd_codigogerado,
      price: item.vl_preco
    };
  },

  renderMany(items: OrdemItem[]){
    return items.map(item => this.render(item));
  }
}