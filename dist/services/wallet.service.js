"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const database_1 = __importDefault(require("../config/database"));
const wallet_model_1 = require("../models/wallet.model");
const transaction_model_1 = require("../models/transaction.model");
const helpers_util_1 = require("../utils/helpers.util");
class WalletService {
    async fundWallet(userId, amount, description = 'Wallet funding') {
        if (amount <= 0) {
            throw new Error('Amount must be greater than zero');
        }
        const wallet = await wallet_model_1.WalletModel.findByUserId(userId);
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        const trx = await database_1.default.transaction();
        try {
            const reference = helpers_util_1.Helpers.generateReference('FUND');
            const transaction = await transaction_model_1.TransactionModel.create({
                wallet_id: wallet.id,
                transaction_type: 'credit',
                amount,
                reference,
                description,
                status: 'pending',
                metadata: { type: 'funding' },
            });
            await wallet_model_1.WalletModel.updateBalance(wallet.id, amount, 'increment');
            await transaction_model_1.TransactionModel.updateStatus(transaction.id, 'success');
            await trx.commit();
            return await transaction_model_1.TransactionModel.findById(transaction.id);
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async transferFunds(senderId, recipientEmail, amount, description = 'Transfer') {
        if (amount <= 0) {
            throw new Error('Amount must be greater than zero');
        }
        const senderWallet = await wallet_model_1.WalletModel.findByUserId(senderId);
        if (!senderWallet) {
            throw new Error('Sender wallet not found');
        }
        if (senderWallet.balance < amount) {
            throw new Error('Insufficient balance');
        }
        const recipientUser = await (0, database_1.default)('users').where({ email: recipientEmail }).first();
        if (!recipientUser) {
            throw new Error('Recipient not found');
        }
        const recipientWallet = await wallet_model_1.WalletModel.findByUserId(recipientUser.id);
        if (!recipientWallet) {
            throw new Error('Recipient wallet not found');
        }
        if (senderId === recipientUser.id) {
            throw new Error('Cannot transfer to yourself');
        }
        const trx = await database_1.default.transaction();
        const reference = helpers_util_1.Helpers.generateReference('TRF');
        try {
            const debitTransaction = await transaction_model_1.TransactionModel.create({
                wallet_id: senderWallet.id,
                transaction_type: 'debit',
                amount,
                reference: `${reference}-DEBIT`,
                description: `Transfer to ${recipientEmail}`,
                status: 'pending',
                metadata: { recipient_email: recipientEmail, type: 'transfer_debit' },
            });
            const creditTransaction = await transaction_model_1.TransactionModel.create({
                wallet_id: recipientWallet.id,
                transaction_type: 'credit',
                amount,
                reference: `${reference}-CREDIT`,
                description: `Transfer from ${senderId}`,
                status: 'pending',
                metadata: { sender_id: senderId, type: 'transfer_credit' },
            });
            await wallet_model_1.WalletModel.updateBalance(senderWallet.id, amount, 'decrement');
            await wallet_model_1.WalletModel.updateBalance(recipientWallet.id, amount, 'increment');
            await transaction_model_1.TransactionModel.updateStatus(debitTransaction.id, 'success');
            await transaction_model_1.TransactionModel.updateStatus(creditTransaction.id, 'success');
            await trx.commit();
            return {
                debitTransaction: await transaction_model_1.TransactionModel.findById(debitTransaction.id),
                creditTransaction: await transaction_model_1.TransactionModel.findById(creditTransaction.id),
            };
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async withdrawFunds(userId, amount, description = 'Withdrawal') {
        if (amount <= 0) {
            throw new Error('Amount must be greater than zero');
        }
        const wallet = await wallet_model_1.WalletModel.findByUserId(userId);
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        if (wallet.balance < amount) {
            throw new Error('Insufficient balance');
        }
        const trx = await database_1.default.transaction();
        try {
            const reference = helpers_util_1.Helpers.generateReference('WTD');
            const transaction = await transaction_model_1.TransactionModel.create({
                wallet_id: wallet.id,
                transaction_type: 'debit',
                amount,
                reference,
                description,
                status: 'pending',
                metadata: { type: 'withdrawal' },
            });
            await wallet_model_1.WalletModel.updateBalance(wallet.id, amount, 'decrement');
            await transaction_model_1.TransactionModel.updateStatus(transaction.id, 'success');
            await trx.commit();
            return await transaction_model_1.TransactionModel.findById(transaction.id);
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async getBalance(userId) {
        return await wallet_model_1.WalletModel.getBalance(userId);
    }
    async getTransactionHistory(userId, limit = 50, offset = 0) {
        const wallet = await wallet_model_1.WalletModel.findByUserId(userId);
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        return await transaction_model_1.TransactionModel.findByWalletId(wallet.id, limit, offset);
    }
}
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map