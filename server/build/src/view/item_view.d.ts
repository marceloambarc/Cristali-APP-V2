import OrdemItem from "../models/OrdemItem";
declare const _default: {
    render(item: OrdemItem): {
        orderId: import("../models/Ordem").default;
        id: number;
        nm_produto: string;
        cd_codigogerado: string;
        vl_preco: number;
    };
    renderMany(items: OrdemItem[]): {
        orderId: import("../models/Ordem").default;
        id: number;
        nm_produto: string;
        cd_codigogerado: string;
        vl_preco: number;
    }[];
};
export default _default;
