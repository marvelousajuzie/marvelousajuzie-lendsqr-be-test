"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const helpers_util_1 = require("../utils/helpers.util");
class TransactionModel {
    static async create(transactionData) {
        const id = helpers_util_1.Helpers.generateUUID();
        await (0, database_1.default)(this.table).insert({
            id,
            ...transactionData,
            created_at: database_1.default.fn.now(),
            updated_at: database_1.default.fn.now(),
        });
        const transaction = await this.findById(id);
        if (!transaction)
            throw new Error('Transaction creation failed');
        return transaction;
    }
    static async findById(id) {
        const transaction = await (0, database_1.default)(this.table).where({ id }).first();
        return transaction || null;
    }
    static async findByReference(reference) {
        const transaction = await (0, database_1.default)(this.table).where({ reference }).first();
        return transaction || null;
    }
    static async findByWalletId(walletId, limit = 50, offset = 0) {
        return await (0, database_1.default)(this.table)
            .where({ wallet_id: walletId })
            .orderBy('created_at', 'desc')
            .limit(limit)
            .offset(offset);
    }
    static async updateStatus(id, status) {
        await (0, database_1.default)(this.table)
            .where({ id })
            .update({
            status,
            updated_at: database_1.default.fn.now(),
        });
        const transaction = await this.findById(id);
        if (!transaction)
            throw new Error('Transaction not found');
        return transaction;
    }
}
exports.TransactionModel = TransactionModel;
TransactionModel.table = 'transactions';
//# sourceMappingURL=transaction.model.js.map