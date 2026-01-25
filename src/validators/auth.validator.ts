
import Joi from 'joi';

export class AuthValidator {
  static register = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters',
      'any.required': 'Password is required',
    }),
    first_name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'First name must be at least 2 characters',
      'any.required': 'First name is required',
    }),
    last_name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Last name must be at least 2 characters',
      'any.required': 'Last name is required',
    }),
    phone_number: Joi.string()
      .pattern(/^(\+234|0)[789]\d{9}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid Nigerian phone number format',
        'any.required': 'Phone number is required',
      }),
  });

  static login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
}