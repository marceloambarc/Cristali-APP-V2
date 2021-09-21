import { Request, Response } from "express";
declare const _default: {
    index(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    show(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    showOpenSales(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    showInsertedSales(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    showSelectedPaymentSales(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    edit(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    editCondition(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    deleteNotAllowed(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    userOrders(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    userSavedOrders(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    userHystory(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    historyPaid(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    historyNotPaid(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
};
export default _default;
