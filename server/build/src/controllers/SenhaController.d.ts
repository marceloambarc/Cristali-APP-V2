import { Request, Response } from 'express';
declare const _default: {
    index(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    show(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    login(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    hashPasswords(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    resetPassword(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    changePassword(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    switch(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    edit(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
};
export default _default;
