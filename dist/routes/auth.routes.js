"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post('/register', validation_middleware_1.ValidationMiddleware.validate(auth_validator_1.AuthValidator.register), authController.register);
router.post('/login', validation_middleware_1.ValidationMiddleware.validate(auth_validator_1.AuthValidator.login), authController.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map