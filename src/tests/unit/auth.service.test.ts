jest.mock('../../models/user.model');
jest.mock('../../models/wallet.model');
jest.mock('../../services/karma.service');
jest.mock('bcryptjs');



import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { WalletModel } from '../../models/wallet.model';
import { KarmaService } from '../../services/karma.service';
import bcrypt from 'bcryptjs';



describe('AuthService - User Authentication', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register - Positive Scenarios', () => {
    it('should successfully register a user and create wallet', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '+2348012345678',
      };

      const mockUser = {
        id: 'user-123',
        ...userData,
        password: 'hashed_password',
        is_blacklisted: false,
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (KarmaService.prototype.checkBlacklist as jest.Mock).mockResolvedValue(false);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
      (WalletModel.create as jest.Mock).mockResolvedValue({ id: 'wallet-123', user_id: 'user-123' });

      const result = await authService.register(userData);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user).not.toHaveProperty('password');
      expect(WalletModel.create).toHaveBeenCalledWith('user-123');
    });
  });

  describe('register - Negative Scenarios', () => {
    it('should reject blacklisted user', async () => {
      const userData = {
        email: 'blacklisted@example.com',
        password: 'Pass123!',
        first_name: 'Bad',
        last_name: 'User',
        phone_number: '+2348012345678',
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (KarmaService.prototype.checkBlacklist as jest.Mock).mockResolvedValue(true);

      await expect(authService.register(userData)).rejects.toThrow(
        'User is blacklisted and cannot be onboarded'
      );

      expect(UserModel.create).not.toHaveBeenCalled();
      expect(WalletModel.create).not.toHaveBeenCalled();
    });

    it('should reject duplicate email', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'Pass123!',
        first_name: 'Test',
        last_name: 'User',
        phone_number: '+2348012345678',
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue({ id: 'existing-user' });

      await expect(authService.register(userData)).rejects.toThrow(
        'Email already registered'
      );
    });
  });

  describe('login - Positive Scenarios', () => {
    it('should successfully login with valid credentials', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed_password',
        is_blacklisted: false,
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.login('test@example.com', 'password123');

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
    });
  });

  describe('login - Negative Scenarios', () => {
    it('should reject invalid email', async () => {
      (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login('wrong@example.com', 'password123')
      ).rejects.toThrow('Invalid credentials');
    });

    it('should reject wrong password', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed_password',
        is_blacklisted: false,
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login('test@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials');
    });
  });
});