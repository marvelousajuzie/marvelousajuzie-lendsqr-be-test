import { Response } from 'express';
import { IAuthRequest } from '../types';
export declare class TransactionController {
    private walletService;
    constructor();
    getTransactionHistory: (req: IAuthRequest, res: Response) => Promise<Response>;
}
