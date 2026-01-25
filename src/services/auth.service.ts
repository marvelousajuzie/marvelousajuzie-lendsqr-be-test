import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { WalletModel } from '../models/wallet.model';
import { KarmaService } from './karma.service';
import { config } from '../config/env';
import { IUser } from '../types';

export class AuthService {
  private karmaService: KarmaService;

  constructor() {
    this.karmaService = new KarmaService();
  }

  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  }): Promise<{ user: Partial<IUser>; token: string }> {
    // Check if email already exists
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Check Karma blacklist
    const isBlacklisted = await this.karmaService.checkBlacklist(userData.email);
    if (isBlacklisted) {
      throw new Error('User is blacklisted and cannot be onboarded');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await UserModel.create({
      ...userData,
      password: hashedPassword,
      is_blacklisted: false,
    });

    // Create wallet for user
    await WalletModel.create(user.id);

    // Generate JWT token
    const token = this.generateToken(user.id, user.email);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async login(email: string, password: string): Promise<{ user: Partial<IUser>; token: string }> {
    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if blacklisted
    if (user.is_blacklisted) {
      throw new Error('Account is blacklisted');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user.id, user.email);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  private generateToken(userId: string, email: string): string {
  return jwt.sign(
    { id: userId, email },
    config.jwt.secret as jwt.Secret,
    { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
  );
}

  verifyToken(token: string): { id: string; email: string } {
  try {
    const decoded = jwt.verify(
      token, 
      config.jwt.secret as jwt.Secret
    ) as { id: string; email: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
}