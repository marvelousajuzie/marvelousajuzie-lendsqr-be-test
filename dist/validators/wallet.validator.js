"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class WalletValidator {
}
exports.WalletValidator = WalletValidator;
WalletValidator.fund = joi_1.default.object({
    amount: joi_1.default.number().positive().precision(2).required().messages({
        'number.positive': 'Amount must be greater than zero',
        'any.required': 'Amount is required',
    }),
    description: joi_1.default.string().max(255).optional(),
});
WalletValidator.transfer = joi_1.default.object({
    recipient_email: joi_1.default.string().email().required().messages({
        'string.email': 'Invalid recipient email format',
        'any.required': 'Recipient email is required',
    }),
    amount: joi_1.default.number().positive().precision(2).required().messages({
        'number.positive': 'Amount must be greater than zero',
        'any.required': 'Amount is required',
    }),
    description: joi_1.default.string().max(255).optional(),
});
WalletValidator.withdraw = joi_1.default.object({
    amount: joi_1.default.number().positive().precision(2).required().messages({
        'number.positive': 'Amount must be greater than zero',
        'any.required': 'Amount is required',
    }),
    description: joi_1.default.string().max(255).optional(),
});
//# sourceMappingURL=wallet.validator.js.map