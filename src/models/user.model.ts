import db from '../config/database';
import { IUser } from '../types';
import { Helpers } from '../utils/helpers.util';

export class UserModel {
  private static table = 'users';

  static async create(userData: Partial<IUser>): Promise<IUser> {
    const id = Helpers.generateUUID();
    
    await db(this.table).insert({
      id,
      ...userData,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    });
    
 
    const user = await this.findById(id);
    if (!user) throw new Error('User creation failed');
    
    return user;
  }

  static async findById(id: string): Promise<IUser | null> {
    const user = await db(this.table).where({ id }).first();
    return user || null;
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const user = await db(this.table).where({ email }).first();
    return user || null;
  }

  static async update(id: string, updates: Partial<IUser>): Promise<IUser> {
    await db(this.table)
      .where({ id })
      .update({
        ...updates,
        updated_at: db.fn.now(),
      });
    
    const user = await this.findById(id);
    if (!user) throw new Error('User not found');
    
    return user;
  }

  static async emailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}