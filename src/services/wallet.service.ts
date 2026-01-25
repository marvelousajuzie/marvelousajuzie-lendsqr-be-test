
import db from '../config/database';
import { WalletModel } from '../models/wallet.model';
import { TransactionModel } from '../models/transaction.model';
import { Helpers } from '../utils/helpers.util';
import { ITransaction } from '../types';

export class WalletService {
  async fundWallet(
    userId: string,
    amount: number,
    description: string = 'Wallet funding'
  ): Promise<ITransaction> {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    const wallet = await WalletModel.findByUserId(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const trx = await db.transaction();

    try {
      // Create transaction record
      const reference = Helpers.generateReference('FUND');
      const transaction = await TransactionModel.create({
        wallet_id: wallet.id,
        transaction_type: 'credit',
        amount,
        reference,
        description,
        status: 'pending',
        metadata: { type: 'funding' },
      });

      // Update wallet balance
      await WalletModel.updateBalance(wallet.id, amount, 'increment');

      // Update transaction status
      await TransactionModel.updateStatus(transaction.id, 'success');

      await trx.commit();

      return await TransactionModel.findById(transaction.id) as ITransaction;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async transferFunds(
    senderId: string,
    recipientEmail: string,
    amount: number,
    description: string = 'Transfer'
  ): Promise<{ debitTransaction: ITransaction; creditTransaction: ITransaction }> {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    // Get sender wallet
    const senderWallet = await WalletModel.findByUserId(senderId);
    if (!senderWallet) {
      throw new Error('Sender wallet not found');
    }

    // Check sufficient balance
    if (senderWallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Find recipient by email
    const recipientUser = await db('users').where({ email: recipientEmail }).first();
    if (!recipientUser) {
      throw new Error('Recipient not found');
    }

    // Get recipient wallet
    const recipientWallet = await WalletModel.findByUserId(recipientUser.id);
    if (!recipientWallet) {
      throw new Error('Recipient wallet not found');
    }

    // Cannot transfer to self
    if (senderId === recipientUser.id) {
      throw new Error('Cannot transfer to yourself');
    }

    const trx = await db.transaction();
    const reference = Helpers.generateReference('TRF');

    try {
      // Create debit transaction for sender
      const debitTransaction = await TransactionModel.create({
        wallet_id: senderWallet.id,
        transaction_type: 'debit',
        amount,
        reference: `${reference}-DEBIT`,
        description: `Transfer to ${recipientEmail}`,
        status: 'pending',
        metadata: { recipient_email: recipientEmail, type: 'transfer_debit' },
      });

      // Create credit transaction for recipient
      const creditTransaction = await TransactionModel.create({
        wallet_id: recipientWallet.id,
        transaction_type: 'credit',
        amount,
        reference: `${reference}-CREDIT`,
        description: `Transfer from ${senderId}`,
        status: 'pending',
        metadata: { sender_id: senderId, type: 'transfer_credit' },
      });

      // Update sender balance (decrement)
      await WalletModel.updateBalance(senderWallet.id, amount, 'decrement');

      // Update recipient balance (increment)
      await WalletModel.updateBalance(recipientWallet.id, amount, 'increment');

      // Update transaction statuses
      await TransactionModel.updateStatus(debitTransaction.id, 'success');
      await TransactionModel.updateStatus(creditTransaction.id, 'success');

      await trx.commit();

      return {
        debitTransaction: await TransactionModel.findById(debitTransaction.id) as ITransaction,
        creditTransaction: await TransactionModel.findById(creditTransaction.id) as ITransaction,
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async withdrawFunds(
    userId: string,
    amount: number,
    description: string = 'Withdrawal'
  ): Promise<ITransaction> {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    const wallet = await WalletModel.findByUserId(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    // Check sufficient balance
    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const trx = await db.transaction();

    try {
      // Create transaction record
      const reference = Helpers.generateReference('WTD');
      const transaction = await TransactionModel.create({
        wallet_id: wallet.id,
        transaction_type: 'debit',
        amount,
        reference,
        description,
        status: 'pending',
        metadata: { type: 'withdrawal' },
      });

      // Update wallet balance
      await WalletModel.updateBalance(wallet.id, amount, 'decrement');

      // Update transaction status
      await TransactionModel.updateStatus(transaction.id, 'success');

      await trx.commit();

      return await TransactionModel.findById(transaction.id) as ITransaction;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async getBalance(userId: string): Promise<number> {
    return await WalletModel.getBalance(userId);
  }

  async getTransactionHistory(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<ITransaction[]> {
    const wallet = await WalletModel.findByUserId(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    return await TransactionModel.findByWalletId(wallet.id, limit, offset);
  }
}