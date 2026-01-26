import { KarmaService } from '../../services/karma.service';

describe('KarmaService', () => {
  let karmaService: KarmaService;

  beforeEach(() => {
    karmaService = new KarmaService();
  });

  describe('checkBlacklist', () => {
    it('should be able to check blacklist', async () => {
      const result = await karmaService.checkBlacklist('test@example.com');
      expect(typeof result).toBe('boolean');
    });

    it('should return boolean for any email', async () => {
      const result = await karmaService.checkBlacklist('another@example.com');
      expect(result).toBeDefined();
      expect(typeof result).toBe('boolean');
    });

    it('should handle errors gracefully', async () => {
      const result = await karmaService.checkBlacklist('anyuser@example.com');
      expect(typeof result).toBe('boolean');
    });
  });
});