import { Response, NextFunction } from 'express';
import { IAuthRequest } from '../types';
export declare class AuthMiddleware {
    private authService;
    constructor();
    authenticate: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void | Response>;
}
