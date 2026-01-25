"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const helpers_util_1 = require("../utils/helpers.util");
class UserModel {
    static async create(userData) {
        const id = helpers_util_1.Helpers.generateUUID();
        await (0, database_1.default)(this.table).insert({
            id,
            ...userData,
            created_at: database_1.default.fn.now(),
            updated_at: database_1.default.fn.now(),
        });
        const user = await this.findById(id);
        if (!user)
            throw new Error('User creation failed');
        return user;
    }
    static async findById(id) {
        const user = await (0, database_1.default)(this.table).where({ id }).first();
        return user || null;
    }
    static async findByEmail(email) {
        const user = await (0, database_1.default)(this.table).where({ email }).first();
        return user || null;
    }
    static async update(id, updates) {
        await (0, database_1.default)(this.table)
            .where({ id })
            .update({
            ...updates,
            updated_at: database_1.default.fn.now(),
        });
        const user = await this.findById(id);
        if (!user)
            throw new Error('User not found');
        return user;
    }
    static async emailExists(email) {
        const user = await this.findByEmail(email);
        return !!user;
    }
}
exports.UserModel = UserModel;
UserModel.table = 'users';
//# sourceMappingURL=user.model.js.map