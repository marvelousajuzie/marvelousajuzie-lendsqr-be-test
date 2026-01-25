
import { Response } from 'express';
import { IApiResponse } from '../types';

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): Response {
    const response: IApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 400,
    error?: string
  ): Response {
    const response: IApiResponse = {
      success: false,
      message,
      error,
    };
    return res.status(statusCode).json(response);
  }
}
