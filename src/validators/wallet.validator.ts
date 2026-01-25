
import Joi from 'joi';

export class WalletValidator {
  static fund = Joi.object({
    amount: Joi.number().positive().precision(2).required().messages({
      'number.positive': 'Amount must be greater than zero',
      'any.required': 'Amount is required',
    }),
    description: Joi.string().max(255).optional(),
  });

  static transfer = Joi.object({
    recipient_email: Joi.string().email().required().messages({
      'string.email': 'Invalid recipient email format',
      'any.required': 'Recipient email is required',
    }),
    amount: Joi.number().positive().precision(2).required().messages({
      'number.positive': 'Amount must be greater than zero',
      'any.required': 'Amount is required',
    }),
    description: Joi.string().max(255).optional(),
  });

  static withdraw = Joi.object({
    amount: Joi.number().positive().precision(2).required().messages({
      'number.positive': 'Amount must be greater than zero',
      'any.required': 'Amount is required',
    }),
    description: Joi.string().max(255).optional(),
  });
}