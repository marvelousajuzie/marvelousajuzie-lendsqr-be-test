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
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      wallet: {
        balance: 'GET /api/wallet/balance (Protected)',
        fund: 'POST /api/wallet/fund (Protected)',
        withdraw: 'POST /api/wallet/withdraw (Protected)',
        transfer: 'POST /api/wallet/transfer (Protected)'
      },
      transactions: {
        history: 'GET /api/transactions (Protected)'
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


app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(ErrorMiddleware.notFound);
app.use(ErrorMiddleware.handle);

export default app;