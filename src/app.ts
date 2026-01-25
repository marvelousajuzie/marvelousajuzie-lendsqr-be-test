import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import walletRoutes from './routes/wallet.routes';
import transactionRoutes from './routes/transaction.routes';
import { ErrorMiddleware } from './middleware/error.middleware';

const app: Application = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Demo Credit Wallet Service is running',
    timestamp: new Date().toISOString(),
  });
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/wallet', walletRoutes);
app.use('/api/v1/transactions', transactionRoutes);


app.use(ErrorMiddleware.notFound);
app.use(ErrorMiddleware.handle);

export default app;