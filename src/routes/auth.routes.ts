import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { ValidationMiddleware } from '../middleware/validation.middleware';
import { AuthValidator } from '../validators/auth.validator';

const router = Router();
const authController = new AuthController();

router.post(
  '/register',
  ValidationMiddleware.validate(AuthValidator.register),
  authController.register
);

router.post(
  '/login',
  ValidationMiddleware.validate(AuthValidator.login),
  authController.login
);

export default router;