import { KarmaService } from '../../services/karma.service';
import axios from 'axios';

jest.mock('axios');

describe('KarmaService', () => {
  let karmaService: KarmaService;

  beforeEach(() => {
    process.env.KARMA_BASE_URL = 'https://api.adjutor.io/v2';
   process.env.KARMA_API_KEY = 'mock_karma_api_key_for_testing'; 
    karmaService = new KarmaService();
    jest.clearAllMocks();
  });

  describe('checkBlacklist', () => {
    it('should return true if user is blacklisted', async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: { status: 'blacklisted' },
      });

      const result = await karmaService.checkBlacklist('blacklisted@example.com');

      expect(result).toBe(true);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('blacklisted@example.com'),
        expect.any(Object)
      );
    });

    it('should return false if user is not blacklisted (404)', async () => {
      const error: any = new Error('Not found');
      error.response = { status: 404 };
      (axios.get as jest.Mock).mockRejectedValue(error);

      const result = await karmaService.checkBlacklist('clean@example.com');

      expect(result).toBe(false);
    });

    it('should return false on API error (fail-open)', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await karmaService.checkBlacklist('test@example.com');

      expect(result).toBe(false);
    });
  });
});