import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ValidationMiddleware } from '../middleware/validation.middleware';
import { WalletValidator } from '../validators/wallet.validator';

const router = Router();
const walletController = new WalletController();
const authMiddleware = new AuthMiddleware();


router.use(authMiddleware.authenticate.bind(authMiddleware));

router.get('/balance', walletController.getBalance);

router.post(
  '/fund',
  ValidationMiddleware.validate(WalletValidator.fund),
  walletController.fundWallet
);

router.post(
  '/transfer',
  ValidationMiddleware.validate(WalletValidator.transfer),
  walletController.transfer
);

router.post(
  '/withdraw',
  ValidationMiddleware.validate(WalletValidator.withdraw),
  walletController.withdraw
);

export default router;