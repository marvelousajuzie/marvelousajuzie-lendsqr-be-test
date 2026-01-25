import { ITransaction } from '../types';
export declare class WalletService {
    fundWallet(userId: string, amount: number, description?: string): Promise<ITransaction>;
    transferFunds(senderId: string, recipientEmail: string, amount: number, description?: string): Promise<{
        debitTransaction: ITransaction;
        creditTransaction: ITransaction;
    }>;
    withdrawFunds(userId: string, amount: number, description?: string): Promise<ITransaction>;
    getBalance(userId: string): Promise<number>;
    getTransactionHistory(userId: string, limit?: number, offset?: number): Promise<ITransaction[]>;
}
