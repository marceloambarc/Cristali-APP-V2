import Habiltipo from "../models/Habiltipo";
declare const _default: {
    render(habilTipo: Habiltipo): {
        id: number;
        description: string;
        type: number;
        obs: string;
        refCode: number;
    };
    renderMany(habilTipos: Habiltipo[]): {
        id: number;
        description: string;
        type: number;
        obs: string;
        refCode: number;
    }[];
};
export default _default;
