"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const transactionController = new transaction_controller_1.TransactionController();
const authMiddleware = new auth_middleware_1.AuthMiddleware();
// All transaction routes require authentication
router.use(authMiddleware.authenticate.bind(authMiddleware));
router.get('/', transactionController.getTransactionHistory);
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map