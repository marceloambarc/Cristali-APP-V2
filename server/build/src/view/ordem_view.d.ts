import Ordem from "../models/Ordem";
declare const _default: {
    render(ordem: Ordem): {
        id: number;
        userCode: number;
        createdAt: Date;
        totalPrice: string;
        orderNotes: string;
        condition: number;
        clientCode: number;
    };
    renderWithItens(ordem: Ordem): {
        id: number;
        userCode: string;
        createdAt: Date;
        totalPrice: string;
        orderNotes: string;
        condition: number;
        clientCode: number;
        itens: {
            orderId: Ordem;
            id: number;
            nm_produto: string;
            cd_codigogerado: string;
            vl_preco: number;
        }[];
    };
    renderMany(ordens: Ordem[]): {
        id: number;
        userCode: number;
        createdAt: Date;
        totalPrice: string;
        orderNotes: string;
        condition: number;
        clientCode: number;
    }[];
    renderManyWithItens(ordens: Ordem[]): {
        id: number;
        userCode: string;
        createdAt: Date;
        totalPrice: string;
        orderNotes: string;
        condition: number;
        clientCode: number;
        itens: {
            orderId: Ordem;
            id: number;
            nm_produto: string;
            cd_codigogerado: string;
            vl_preco: number;
        }[];
    }[];
};
export default _default;
