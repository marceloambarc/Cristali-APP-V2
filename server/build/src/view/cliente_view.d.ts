import Clientefinal from "../models/ClienteFinal";
declare const _default: {
    render(cliente: Clientefinal): {
        id: number;
        clientName: string;
        clientCgc: string;
        clientPhone: string;
        clientEmail: string;
        clientNotes: string;
        userCode: string;
    };
    renderMany(clientes: Clientefinal[]): {
        id: number;
        clientName: string;
        clientCgc: string;
        clientPhone: string;
        clientEmail: string;
        clientNotes: string;
        userCode: string;
    }[];
};
export default _default;
