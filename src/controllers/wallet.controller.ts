
import { Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { ApiResponse } from '../utils/response.util';
import { IAuthRequest } from '../types';

export class WalletController {
  private walletService: WalletService;

  constructor() {
    this.walletService = new WalletService();
  }

  getBalance = async (req: IAuthRequest, res: Response): Promise<Response> => {
    try {
      const userId = req.user!.id;
      const balance = await this.walletService.getBalance(userId);

      return ApiResponse.success(res, 'Balance retrieved successfully', {
        balance,
        currency: 'NGN',
      });
    } catch (error: any) {
      return ApiResponse.error(res, error.message, 400);
    }
  };

  fundWallet = async (req: IAuthRequest, res: Response): Promise<Response> => {
    try {
      const userId = req.user!.id;
      const { amount, description } = req.body;

      const transaction = await this.walletService.fundWallet(
        userId,
        parseFloat(amount),
        description
      );

      return ApiResponse.success(
        res,
        'Wallet funded successfully',
        transaction,
        201
      );
    } catch (error: any) {
      return ApiResponse.error(res, error.message, 400);
    }
  };

  transfer = async (req: IAuthRequest, res: Response): Promise<Response> => {
    try {
      const userId = req.user!.id;
      const { recipient_email, amount, description } = req.body;

      const result = await this.walletService.transferFunds(
        userId,
        recipient_email,
        parseFloat(amount),
        description
      );

      return ApiResponse.success(res, 'Transfer successful', result, 201);
    } catch (error: any) {
      return ApiResponse.error(res, error.message, 400);
    }
  };

  withdraw = async (req: IAuthRequest, res: Response): Promise<Response> => {
    try {
      const userId = req.user!.id;
      const { amount, description } = req.body;

      const transaction = await this.walletService.withdrawFunds(
        userId,
        parseFloat(amount),
        description
      );

      return ApiResponse.success(res, 'Withdrawal successful', transaction, 201);
    } catch (error: any) {
      return ApiResponse.error(res, error.message, 400);
    }
  };
}
