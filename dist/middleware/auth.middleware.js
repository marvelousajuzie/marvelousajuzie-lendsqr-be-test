"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const auth_service_1 = require("../services/auth.service");
const response_util_1 = require("../utils/response.util");
class AuthMiddleware {
    constructor() {
        this.authenticate = async (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return response_util_1.ApiResponse.error(res, 'No token provided', 401);
                }
                const token = authHeader.substring(7);
                const decoded = this.authService.verifyToken(token);
                req.user = decoded;
                next();
            }
            catch (error) {
                return response_util_1.ApiResponse.error(res, 'Invalid or expired token', 401);
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map