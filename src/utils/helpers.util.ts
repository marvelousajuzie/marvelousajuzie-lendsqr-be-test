import crypto from 'crypto';

export class Helpers {

  static generateUUID(): string {

    return crypto.randomUUID();
  }

  static generateReference(prefix: string = 'TXN'): string {
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }
  static formatCurrency(amount: number, currency: string = 'NGN'): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^(\+234|0)[789]\d{9}$/;
    return phoneRegex.test(phone);
  }
}