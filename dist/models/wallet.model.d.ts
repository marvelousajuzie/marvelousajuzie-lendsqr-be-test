import { IWallet } from '../types';
export declare class WalletModel {
    private static table;
    static create(userId: string): Promise<IWallet>;
    static findByUserId(userId: string): Promise<IWallet | null>;
    static findById(id: string): Promise<IWallet | null>;
    static updateBalance(id: string, amount: number, type: 'increment' | 'decrement'): Promise<IWallet>;
    static getBalance(userId: string): Promise<number>;
}
