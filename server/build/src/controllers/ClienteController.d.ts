import { Request, Response } from "express";
declare const _default: {
    index(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    show(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    showWithOrders(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    edit(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    create(request: Request, response: Response, clienteData?: object | undefined): Promise<Response<any, Record<string, any>>>;
    userClients(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
};
export default _default;
