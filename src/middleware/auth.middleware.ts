
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../utils/response.util';
import { IAuthRequest } from '../types';

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  authenticate = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ApiResponse.error(res, 'No token provided', 401);
      }

      const token = authHeader.substring(7);
      const decoded = this.authService.verifyToken(token);

      req.user = decoded;
      next();
    } catch (error: any) {
      return ApiResponse.error(res, 'Invalid or expired token', 401);
    }
  };
}