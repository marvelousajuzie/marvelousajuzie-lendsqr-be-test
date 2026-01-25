import { IUser } from '../types';
export declare class AuthService {
    private karmaService;
    constructor();
    register(userData: {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        phone_number: string;
    }): Promise<{
        user: Partial<IUser>;
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: Partial<IUser>;
        token: string;
    }>;
    private generateToken;
    verifyToken(token: string): {
        id: string;
        email: string;
    };
}
