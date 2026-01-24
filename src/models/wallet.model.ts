import db from '../config/database';
import { IWallet } from '../types';
import { Helpers } from '../utils/helpers.util';

export class WalletModel {
  private static table = 'wallets';

  static async create(userId: string): Promise<IWallet> {
    const id = Helpers.generateUUID();
    
    await db(this.table).insert({
      id,
      user_id: userId,
      balance: 0.00,
      currency: 'NGN',
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    });
    
    const wallet = await this.findById(id);
    if (!wallet) throw new Error('Wallet creation failed');
    
    return wallet;
  }

  static async findByUserId(userId: string): Promise<IWallet | null> {
    const wallet = await db(this.table).where({ user_id: userId }).first();
    return wallet || null;
  }

  static async findById(id: string): Promise<IWallet | null> {
    const wallet = await db(this.table).where({ id }).first();
    return wallet || null;
  }

  static async updateBalance(
    id: string,
    amount: number,
    type: 'increment' | 'decrement'
  ): Promise<IWallet> {
    const column = 'balance';
    
    if (type === 'increment') {
      await db(this.table).where({ id }).increment(column, amount);
    } else {
      await db(this.table).where({ id }).decrement(column, amount);
    }

    await db(this.table).where({ id }).update({ updated_at: db.fn.now() });
    
    const wallet = await this.findById(id);
    if (!wallet) throw new Error('Wallet not found after update');
    
    return wallet;
  }

  static async getBalance(userId: string): Promise<number> {
    const wallet = await this.findByUserId(userId);
    return wallet ? wallet.balance : 0;
  }
}