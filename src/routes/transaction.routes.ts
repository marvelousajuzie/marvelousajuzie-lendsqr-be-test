impimport { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = Router();
const transactionController = new TransactionController();
const authMiddleware = new AuthMiddleware();

// All transaction routes require authentication
router.use(authMiddleware.authenticate.bind(authMiddleware));

router.get('/', transactionController.getTransactionHistory);

export default router;