export declare class Helpers {
    static generateUUID(): string;
    static generateReference(prefix?: string): string;
    static formatCurrency(amount: number, currency?: string): string;
    static validateEmail(email: string): boolean;
    static validatePhoneNumber(phone: string): boolean;
}
