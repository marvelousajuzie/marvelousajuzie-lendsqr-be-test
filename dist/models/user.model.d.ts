import { IUser } from '../types';
export declare class UserModel {
    private static table;
    static create(userData: Partial<IUser>): Promise<IUser>;
    static findById(id: string): Promise<IUser | null>;
    static findByEmail(email: string): Promise<IUser | null>;
    static update(id: string, updates: Partial<IUser>): Promise<IUser>;
    static emailExists(email: string): Promise<boolean>;
}
