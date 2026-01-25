import { ITransaction } from '../types';
export declare class TransactionModel {
    private static table;
    static create(transactionData: Partial<ITransaction>): Promise<ITransaction>;
    static findById(id: string): Promise<ITransaction | null>;
    static findByReference(reference: string): Promise<ITransaction | null>;
    static findByWalletId(walletId: string, limit?: number, offset?: number): Promise<ITransaction[]>;
    static updateStatus(id: string, status: 'pending' | 'success' | 'failed'): Promise<ITransaction>;
}
