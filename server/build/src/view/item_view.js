"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(item) {
        return {
            orderId: item.ordem,
            id: item.cd_id,
            nm_produto: item.nm_produto,
            cd_codigogerado: item.cd_codigogerado,
            vl_preco: item.vl_preco
        };
    },
    renderMany(items) {
        return items.map(item => this.render(item));
    }
};
