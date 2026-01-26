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


app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Demo Credit Wallet Service API',
    version: '1.0.0',
    developer: 'Marvelous Ajuzie',
    documentation: {
      health: 'GET /health',
      authentication: {
        register: 'POST /api/v1/auth/register',
        login: 'POST /api/v1/auth/login'
      },
      wallet: {
        balance: 'GET /api/v1/wallet/balance (Protected)',
        fund: 'POST /api/v1/wallet/fund (Protected)',
        withdraw: 'POST /api/v1/wallet/withdraw (Protected)',
        transfer: 'POST /api/v1/wallet/transfer (Protected)'
      },
      transactions: {
        history: 'GET /api/v1/transactions (Protected)'
      }
    },
    links: {
      github: 'https://github.com/marvelousajuzie/marvelousajuzie-lendsqr-be-test',
      readme: 'https://github.com/marvelousajuzie/marvelousajuzie-lendsqr-be-test#readme'
    },
    note: 'Protected routes require Authorization: Bearer <token> header'
  });
});


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