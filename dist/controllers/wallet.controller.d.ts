import { Response } from 'express';
import { IAuthRequest } from '../types';
export declare class WalletController {
    private walletService;
    constructor();
    getBalance: (req: IAuthRequest, res: Response) => Promise<Response>;
    fundWallet: (req: IAuthRequest, res: Response) => Promise<Response>;
    transfer: (req: IAuthRequest, res: Response) => Promise<Response>;
    withdraw: (req: IAuthRequest, res: Response) => Promise<Response>;
}
