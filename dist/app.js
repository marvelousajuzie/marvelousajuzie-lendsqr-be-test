"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const wallet_routes_1 = __importDefault(require("./routes/wallet.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Demo Credit Wallet Service is running',
        timestamp: new Date().toISOString(),
    });
});
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/wallet', wallet_routes_1.default);
app.use('/api/v1/transactions', transaction_routes_1.default);
app.use(error_middleware_1.ErrorMiddleware.notFound);
app.use(error_middleware_1.ErrorMiddleware.handle);
exports.default = app;
//# sourceMappingURL=app.js.map