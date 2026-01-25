"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static success(res, message, data, statusCode = 200) {
        const response = {
            success: true,
            message,
            data,
        };
        return res.status(statusCode).json(response);
    }
    static error(res, message, statusCode = 400, error) {
        const response = {
            success: false,
            message,
            error,
        };
        return res.status(statusCode).json(response);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=response.util.js.map