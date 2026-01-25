import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiResponse } from '../utils/response.util';

export class ValidationMiddleware {
  static validate(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction): void | Response => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return ApiResponse.error(res, 'Validation error', 400, errors.join(', '));
      }

      req.body = value;
      next();
    };
  }
}
