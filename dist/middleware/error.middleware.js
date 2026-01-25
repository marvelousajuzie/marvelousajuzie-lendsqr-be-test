"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const response_util_1 = require("../utils/response.util");
class ErrorMiddleware {
    static handle(error, req, res, next) {
        console.error('Error:', error);
        if (res.headersSent) {
            return next(error);
        }
        return response_util_1.ApiResponse.error(res, 'Internal server error', 500, error.message);
    }
    static notFound(req, res) {
        return response_util_1.ApiResponse.error(res, 'Route not found', 404);
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=error.middleware.js.map