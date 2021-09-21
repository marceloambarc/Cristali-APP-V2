import Senha from "../models/Senha";
declare const _default: {
    render(senha: Senha): {
        id: number;
        isActive: number;
        userCode: string;
        userName: string;
        cgc: string;
    };
    renderMany(senhas: Senha[]): {
        id: number;
        isActive: number;
        userCode: string;
        userName: string;
        cgc: string;
    }[];
};
export default _default;
