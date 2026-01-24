
jest.mock('../../models/wallet.model');
jest.mock('../../models/transaction.model');

import { WalletService } from '../../services/wallet.service';
import { WalletModel } from '../../models/wallet.model';
import { TransactionModel } from '../../models/transaction.model';



describe('WalletService - Core Wallet Operations', () => {
  let walletService: WalletService;

  beforeEach(() => {
    walletService = new WalletService();
    jest.clearAllMocks();
  });

  describe('fundWallet - Positive Scenarios', () => {
    it('should successfully fund a wallet', async () => {
      const mockWallet = { 
        id: 'wallet-123', 
        user_id: 'user-123', 
        balance: 0,
        currency: 'NGN' 
      };
      const mockTransaction = {
        id: 'txn-123',
        wallet_id: 'wallet-123',
        transaction_type: 'credit',
        amount: 10000,
        reference: 'FUND-123',
        status: 'success',
      };

      (WalletModel.findByUserId as jest.Mock).mockResolvedValue(mockWallet);
      (TransactionModel.create as jest.Mock).mockResolvedValue(mockTransaction);
      (WalletModel.updateBalance as jest.Mock).mockResolvedValue({ ...mockWallet, balance: 10000 });
      (TransactionModel.updateStatus as jest.Mock).mockResolvedValue(mockTransaction);
      (TransactionModel.findById as jest.Mock).mockResolvedValue(mockTransaction);

      const result = await walletService.fundWallet('user-123', 10000, 'Initial deposit');

      expect(result).toBeDefined();
      expect(result.id).toBe('txn-123');
      expect(WalletModel.findByUserId).toHaveBeenCalledWith('user-123');
      expect(WalletModel.updateBalance).toHaveBeenCalledWith('wallet-123', 10000, 'increment');
    });
  });

  describe('fundWallet - Negative Scenarios', () => {
    it('should reject negative amount', async () => {
      await expect(
        walletService.fundWallet('user-123', -1000)
      ).rejects.toThrow('Amount must be greater than zero');
      
      expect(WalletModel.findByUserId).not.toHaveBeenCalled();
    });

    it('should reject zero amount', async () => {
      await expect(
        walletService.fundWallet('user-123', 0)
      ).rejects.toThrow('Amount must be greater than zero');
    });

    it('should throw error if wallet not found', async () => {
      (WalletModel.findByUserId as jest.Mock).mockResolvedValue(null);

      await expect(
        walletService.fundWallet('user-123', 1000)
      ).rejects.toThrow('Wallet not found');
    });
  });

  describe('withdrawFunds - Positive Scenarios', () => {
    it('should successfully withdraw funds', async () => {
      const mockWallet = { 
        id: 'wallet-123', 
        user_id: 'user-123', 
        balance: 5000 
      };
      const mockTransaction = {
        id: 'txn-123',
        wallet_id: 'wallet-123',
        transaction_type: 'debit',
        amount: 2000,
        status: 'success',
      };

      (WalletModel.findByUserId as jest.Mock).mockResolvedValue(mockWallet);
      (TransactionModel.create as jest.Mock).mockResolvedValue(mockTransaction);
      (WalletModel.updateBalance as jest.Mock).mockResolvedValue({ ...mockWallet, balance: 3000 });
      (TransactionModel.updateStatus as jest.Mock).mockResolvedValue(mockTransaction);
      (TransactionModel.findById as jest.Mock).mockResolvedValue(mockTransaction);

      const result = await walletService.withdrawFunds('user-123', 2000);

      expect(result).toBeDefined();
      expect(WalletModel.updateBalance).toHaveBeenCalledWith('wallet-123', 2000, 'decrement');
    });
  });

  describe('withdrawFunds - Negative Scenarios', () => {
    it('should fail with insufficient balance', async () => {
      const mockWallet = { 
        id: 'wallet-123', 
        user_id: 'user-123', 
        balance: 500 
      };

      (WalletModel.findByUserId as jest.Mock).mockResolvedValue(mockWallet);

      await expect(
        walletService.withdrawFunds('user-123', 5000)
      ).rejects.toThrow('Insufficient balance');
    });

    it('should reject negative withdrawal amount', async () => {
      await expect(
        walletService.withdrawFunds('user-123', -1000)
      ).rejects.toThrow('Amount must be greater than zero');
    });
  });

  describe('getBalance', () => {
    it('should return wallet balance', async () => {
      (WalletModel.getBalance as jest.Mock).mockResolvedValue(5000);

      const balance = await walletService.getBalance('user-123');

      expect(balance).toBe(5000);
      expect(WalletModel.getBalance).toHaveBeenCalledWith('user-123');
    });
  });
});