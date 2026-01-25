import { Request } from 'express';





export interface IUser {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_blacklisted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IWallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITransaction {
  id: string;
  wallet_id: string;
  transaction_type: 'credit' | 'debit';
  amount: number;
  reference: string;
  description: string;
  status: 'pending' | 'success' | 'failed';
  metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IAuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    id: string;
    email: string;
  };
}