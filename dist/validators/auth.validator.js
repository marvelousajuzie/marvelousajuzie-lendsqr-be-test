"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class AuthValidator {
}
exports.AuthValidator = AuthValidator;
AuthValidator.register = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'any.required': 'Password is required',
    }),
    first_name: joi_1.default.string().min(2).max(100).required().messages({
        'string.min': 'First name must be at least 2 characters',
        'any.required': 'First name is required',
    }),
    last_name: joi_1.default.string().min(2).max(100).required().messages({
        'string.min': 'Last name must be at least 2 characters',
        'any.required': 'Last name is required',
    }),
    phone_number: joi_1.default.string()
        .pattern(/^(\+234|0)[789]\d{9}$/)
        .required()
        .messages({
        'string.pattern.base': 'Invalid Nigerian phone number format',
        'any.required': 'Phone number is required',
    }),
});
AuthValidator.login = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
//# sourceMappingURL=auth.validator.js.map