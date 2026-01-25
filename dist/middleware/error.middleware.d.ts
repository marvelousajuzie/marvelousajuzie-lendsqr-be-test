import { Request, Response, NextFunction } from 'express';
export declare class ErrorMiddleware {
    static handle(error: Error, req: Request, res: Response, next: NextFunction): Response;
    static notFound(req: Request, res: Response): Response;
}
