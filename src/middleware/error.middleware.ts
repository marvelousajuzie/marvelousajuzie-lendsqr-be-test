import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response.util';

export class ErrorMiddleware {
  static handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response {
    console.error('Error:', error);

    if (res.headersSent) {
      return next(error) as any;
    }

    return ApiResponse.error(
      res,
      'Internal server error',
      500,
      error.message
    );
  }

  static notFound(req: Request, res: Response): Response {
    return ApiResponse.error(res, 'Route not found', 404);
  }
}