"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarmaService = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
class KarmaService {
    constructor() {
        this.baseUrl = env_1.config.karma.baseUrl;
        this.apiKey = env_1.config.karma.apiKey;
    }
    async checkBlacklist(identifier) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/verification/karma/${identifier}`, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data?.status === 'blacklisted' || false;
        }
        catch (error) {
            if (error.response?.status === 404) {
                return false;
            }
            console.error('Karma API Error:', error.message);
            return false;
        }
    }
    async reportToBlacklist(identifier, reason) {
        try {
            await axios_1.default.post(`${this.baseUrl}/verification/karma`, {
                identity: identifier,
                reason,
            }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return true;
        }
        catch (error) {
            console.error('Karma Report Error:', error.message);
            return false;
        }
    }
}
exports.KarmaService = KarmaService;
//# sourceMappingURL=karma.service.js.map