"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_util_1 = require("../utils/response.util");
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const { email, password, first_name, last_name, phone_number } = req.body;
                const result = await this.authService.register({
                    email,
                    password,
                    first_name,
                    last_name,
                    phone_number,
                });
                return response_util_1.ApiResponse.success(res, 'User registered successfully', result, 201);
            }
            catch (error) {
                return response_util_1.ApiResponse.error(res, error.message, 400);
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const result = await this.authService.login(email, password);
                return response_util_1.ApiResponse.success(res, 'Login successful', result);
            }
            catch (error) {
                return response_util_1.ApiResponse.error(res, error.message, 401);
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map