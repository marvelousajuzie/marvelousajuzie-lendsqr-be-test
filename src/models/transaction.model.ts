import db from '../config/database';
import { ITransaction } from '../types';
import { Helpers } from '../utils/helpers.util';

export class TransactionModel {
  private static table = 'transactions';

  static async create(transactionData: Partial<ITransaction>): Promise<ITransaction> {
    const id = Helpers.generateUUID();
    
    await db(this.table).insert({
      id,
      ...transactionData,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    });
    
 
    const transaction = await this.findById(id);
    if (!transaction) throw new Error('Transaction creation failed');
    
    return transaction;
  }

  static async findById(id: string): Promise<ITransaction | null> {
    const transaction = await db(this.table).where({ id }).first();
    return transaction || null;
  }

  static async findByReference(reference: string): Promise<ITransaction | null> {
    const transaction = await db(this.table).where({ reference }).first();
    return transaction || null;
  }

  static async findByWalletId(
    walletId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<ITransaction[]> {
    return await db(this.table)
      .where({ wallet_id: walletId })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async updateStatus(
    id: string,
    status: 'pending' | 'success' | 'failed'
  ): Promise<ITransaction> {
    await db(this.table)
      .where({ id })
      .update({
        status,
        updated_at: db.fn.now(),
      });
    
    const transaction = await this.findById(id);
    if (!transaction) throw new Error('Transaction not found');
    
    return transaction;
  }
}