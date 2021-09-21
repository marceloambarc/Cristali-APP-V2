import Token from "../models/Token";
declare const _default: {
    render(token: Token): {
        id: number;
        token_celular: string;
        dt_criado: Date;
        dt_modificado: Date;
    };
    renderMany(tokens: Token[]): {
        id: number;
        token_celular: string;
        dt_criado: Date;
        dt_modificado: Date;
    }[];
};
export default _default;
