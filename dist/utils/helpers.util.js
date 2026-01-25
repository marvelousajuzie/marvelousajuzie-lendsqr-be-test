"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Helpers {
    static generateUUID() {
        return crypto_1.default.randomUUID();
    }
    static generateReference(prefix = 'TXN') {
        const timestamp = Date.now();
        const random = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    }
    static formatCurrency(amount, currency = 'NGN') {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency,
        }).format(amount);
    }
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static validatePhoneNumber(phone) {
        const phoneRegex = /^(\+234|0)[789]\d{9}$/;
        return phoneRegex.test(phone);
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.util.js.map