import { Response } from 'express';
export declare class ApiResponse {
    static success<T>(res: Response, message: string, data?: T, statusCode?: number): Response;
    static error(res: Response, message: string, statusCode?: number, error?: string): Response;
}
