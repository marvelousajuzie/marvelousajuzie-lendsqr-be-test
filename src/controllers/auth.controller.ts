
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../utils/response.util';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password, first_name, last_name, phone_number } = req.body;

      const result = await this.authService.register({
        email,
        password,
        first_name,
        last_name,
        phone_number,
      });

      return ApiResponse.success(
        res,
        'User registered successfully',
        result,
        201
      );
    } catch (error: any) {
      return ApiResponse.error(res, error.message, 400);
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      return ApiResponse.success(res, 'Login successful', result);
    } catch (error: any) {
      return ApiResponse.error(res, error.message, 401);
    }
  };
}