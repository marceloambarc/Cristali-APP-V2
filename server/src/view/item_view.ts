import OrdemItem from "../models/OrdemItem";

export default {
  render(item: OrdemItem) {
    return {
      orderId: item.CD_Ordem_ID,
      id: item.CD_ID,
      productName: item.NM_Produto,
      gCode: item.CD_codigoGerado,
      price: item.VL_Preco
    };
  },

  renderMany(items: OrdemItem[]){
    return items.map(item => this.render(item));
  }
}