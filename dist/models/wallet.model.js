"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const helpers_util_1 = require("../utils/helpers.util");
class WalletModel {
    static async create(userId) {
        const id = helpers_util_1.Helpers.generateUUID();
        await (0, database_1.default)(this.table).insert({
            id,
            user_id: userId,
            balance: 0.00,
            currency: 'NGN',
            created_at: database_1.default.fn.now(),
            updated_at: database_1.default.fn.now(),
        });
        const wallet = await this.findById(id);
        if (!wallet)
            throw new Error('Wallet creation failed');
        return wallet;
    }
    static async findByUserId(userId) {
        const wallet = await (0, database_1.default)(this.table).where({ user_id: userId }).first();
        return wallet || null;
    }
    static async findById(id) {
        const wallet = await (0, database_1.default)(this.table).where({ id }).first();
        return wallet || null;
    }
    static async updateBalance(id, amount, type) {
        const column = 'balance';
        if (type === 'increment') {
            await (0, database_1.default)(this.table).where({ id }).increment(column, amount);
        }
        else {
            await (0, database_1.default)(this.table).where({ id }).decrement(column, amount);
        }
        await (0, database_1.default)(this.table).where({ id }).update({ updated_at: database_1.default.fn.now() });
        const wallet = await this.findById(id);
        if (!wallet)
            throw new Error('Wallet not found after update');
        return wallet;
    }
    static async getBalance(userId) {
        const wallet = await this.findByUserId(userId);
        return wallet ? wallet.balance : 0;
    }
}
exports.WalletModel = WalletModel;
WalletModel.table = 'wallets';
//# sourceMappingURL=wallet.model.js.map