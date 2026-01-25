"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const wallet_service_1 = require("../services/wallet.service");
const response_util_1 = require("../utils/response.util");
class TransactionController {
    constructor() {
        this.getTransactionHistory = async (req, res) => {
            try {
                const userId = req.user.id;
                const limit = parseInt(req.query.limit) || 50;
                const offset = parseInt(req.query.offset) || 0;
                const transactions = await this.walletService.getTransactionHistory(userId, limit, offset);
                return response_util_1.ApiResponse.success(res, 'Transaction history retrieved successfully', {
                    transactions,
                    limit,
                    offset,
                });
            }
            catch (error) {
                return response_util_1.ApiResponse.error(res, error.message, 400);
            }
        };
        this.walletService = new wallet_service_1.WalletService();
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map