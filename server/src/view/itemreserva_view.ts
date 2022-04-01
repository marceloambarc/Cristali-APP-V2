import Ordemreservaitem from "../models/OrdemReservaItem";

export default {
  render(itemreserva: Ordemreservaitem) {
    return {
      orderId: itemreserva.ordem,
      id: itemreserva.cd_id,
      nm_produto: itemreserva.nm_produto,
      cd_codigogerado: itemreserva.cd_codigogerado,
      vl_preco: itemreserva.vl_preco
    };
  },

  renderMany(itemsreserva: Ordemreservaitem[]){
    return itemsreserva.map(item => this.render(item));
  }
}