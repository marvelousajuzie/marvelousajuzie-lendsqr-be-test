"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const wallet_service_1 = require("../services/wallet.service");
const response_util_1 = require("../utils/response.util");
class WalletController {
    constructor() {
        this.getBalance = async (req, res) => {
            try {
                const userId = req.user.id;
                const balance = await this.walletService.getBalance(userId);
                return response_util_1.ApiResponse.success(res, 'Balance retrieved successfully', {
                    balance,
                    currency: 'NGN',
                });
            }
            catch (error) {
                return response_util_1.ApiResponse.error(res, error.message, 400);
            }
        };
        this.fundWallet = async (req, res) => {
            try {
                const userId = req.user.id;
                const { amount, description } = req.body;
                const transaction = await this.walletService.fundWallet(userId, parseFloat(amount), description);
                return response_util_1.ApiResponse.success(res, 'Wallet funded successfully', transaction, 201);
            }
            catch (error) {
                return response_util_1.ApiResponse.error(res, error.message, 400);
            }
        };
        this.transfer = async (req, res) => {
            try {
                const userId = req.user.id;
                const { recipient_email, amount, description } = req.body;
                const result = await this.walletService.transferFunds(userId, recipient_email, parseFloat(amount), description);
                return response_util_1.ApiResponse.success(res, 'Transfer successful', result, 201);
            }
            catch (error) {
                return response_util_1.ApiResponse.error(res, error.message, 400);
            }
        };
        this.withdraw = async (req, res) => {
            try {
                const userId = req.user.id;
                const { amount, description } = req.body;
                const transaction = await this.walletService.withdrawFunds(userId, parseFloat(amount), description);
                return response_util_1.ApiResponse.success(res, 'Withdrawal successful', transaction, 201);
            }
            catch (error) {
                return response_util_1.ApiResponse.error(res, error.message, 400);
            }
        };
        this.walletService = new wallet_service_1.WalletService();
    }
}
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map