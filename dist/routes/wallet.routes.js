"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_controller_1 = require("../controllers/wallet.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const wallet_validator_1 = require("../validators/wallet.validator");
const router = (0, express_1.Router)();
const walletController = new wallet_controller_1.WalletController();
const authMiddleware = new auth_middleware_1.AuthMiddleware();
router.use(authMiddleware.authenticate);
router.get('/balance', walletController.getBalance);
router.post('/fund', validation_middleware_1.ValidationMiddleware.validate(wallet_validator_1.WalletValidator.fund), walletController.fundWallet);
router.post('/transfer', validation_middleware_1.ValidationMiddleware.validate(wallet_validator_1.WalletValidator.transfer), walletController.transfer);
router.post('/withdraw', validation_middleware_1.ValidationMiddleware.validate(wallet_validator_1.WalletValidator.withdraw), walletController.withdraw);
exports.default = router;
//# sourceMappingURL=wallet.routes.js.map