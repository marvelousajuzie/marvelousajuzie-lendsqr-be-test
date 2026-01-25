"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const wallet_model_1 = require("../models/wallet.model");
const karma_service_1 = require("./karma.service");
const env_1 = require("../config/env");
class AuthService {
    constructor() {
        this.karmaService = new karma_service_1.KarmaService();
    }
    async register(userData) {
        const existingUser = await user_model_1.UserModel.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already registered');
        }
        // Check Karma blacklist
        const isBlacklisted = await this.karmaService.checkBlacklist(userData.email);
        if (isBlacklisted) {
            throw new Error('User is blacklisted and cannot be onboarded');
        }
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        const user = await user_model_1.UserModel.create({
            ...userData,
            password: hashedPassword,
            is_blacklisted: false,
        });
        await wallet_model_1.WalletModel.create(user.id);
        const token = this.generateToken(user.id, user.email);
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    async login(email, password) {
        const user = await user_model_1.UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        if (user.is_blacklisted) {
            throw new Error('Account is blacklisted');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user.id, user.email);
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    generateToken(userId, email) {
        return jsonwebtoken_1.default.sign({ id: userId, email }, env_1.config.jwt.secret, { expiresIn: env_1.config.jwt.expiresIn });
    }
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt.secret);
            return decoded;
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map