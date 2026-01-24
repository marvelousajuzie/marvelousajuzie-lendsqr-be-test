import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = Router();
const transactionController = new TransactionController();
const authMiddleware = new AuthMiddleware();


router.use((req, res, next) => authMiddleware.authenticate(req, res, next));

router.get('/', transactionController.getTransactionHistory);

export default router;