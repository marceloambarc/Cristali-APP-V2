import Evento from "../models/Evento";
declare const _default: {
    render(event: Evento): {
        id: number;
        createdAt: Date;
        userCode: string;
        eventDescription: string;
        userToken: string;
        deviceToken: string;
    };
    renderMany(events: Evento[]): {
        id: number;
        createdAt: Date;
        userCode: string;
        eventDescription: string;
        userToken: string;
        deviceToken: string;
    }[];
};
export default _default;
