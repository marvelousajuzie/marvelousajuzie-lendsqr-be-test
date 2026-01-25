"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const response_util_1 = require("../utils/response.util");
class ValidationMiddleware {
    static validate(schema) {
        return (req, res, next) => {
            const { error, value } = schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });
            if (error) {
                const errors = error.details.map((detail) => detail.message);
                return response_util_1.ApiResponse.error(res, 'Validation error', 400, errors.join(', '));
            }
            req.body = value;
            next();
        };
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.middleware.js.map