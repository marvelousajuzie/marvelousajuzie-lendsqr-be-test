
import { Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { ApiResponse } from '../utils/response.util';
import { IAuthRequest } from '../types';

export class TransactionController {
  private walletService: WalletService;

  constructor() {
    this.walletService = new WalletService();
  }

  getTransactionHistory = async (
    req: IAuthRequest,
    res: Response
  ): Promise<Response> => {
    try {
      const userId = req.user!.id;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      const transactions = await this.walletService.getTransactionHistory(
        userId,
        limit,
        offset
      );

      return ApiResponse.success(
        res,
        'Transaction history retrieved successfully',
        {
          transactions,
          limit,
          offset,
        }
      );
    } catch (error: any) {
      return ApiResponse.error(res, error.message, 400);
    }
  };
}