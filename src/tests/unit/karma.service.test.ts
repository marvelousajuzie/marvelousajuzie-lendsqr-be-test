import axios from 'axios';
import { config } from '../config/env';

export class KarmaService {
  private baseUrl: string;
  private apiKey: string;
  private useMock: boolean;

  // Simulated blacklist for demonstration
  private mockBlacklist = [
    'blacklisted@example.com',
    'fraud@test.com',
    'scammer@demo.com',
    '+2348099999999'
  ];

  constructor() {
    this.baseUrl = config.karma.baseUrl;
    this.apiKey = config.karma.apiKey;
    this.useMock = !this.apiKey || this.apiKey === 'your_karma_api_key_here';
  }

  async checkBlacklist(identifier: string): Promise<boolean> {
    console.log(`🔍 Checking Karma blacklist for: ${identifier}`);

    // If using mock (no API key or in test mode)
    if (this.useMock) {
      console.log('⚠️  Using MOCK Karma service (API key not configured)');
      const isBlacklisted = this.mockBlacklist.includes(identifier.toLowerCase());
      
      if (isBlacklisted) {
        console.log(`❌ User ${identifier} is BLACKLISTED (mock)`);
      } else {
        console.log(`✅ User ${identifier} is NOT blacklisted (mock)`);
      }
      
      return isBlacklisted;
    }

    // Real API call (when API key is available)
    try {
      console.log(`📡 Calling Karma API: ${this.baseUrl}/verification/karma/${identifier}`);
      
      const response = await axios.get(
        `${this.baseUrl}/verification/karma/${encodeURIComponent(identifier)}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      const isBlacklisted = response.data?.status === 'blacklisted';
      
      if (isBlacklisted) {
        console.log(`❌ User ${identifier} is BLACKLISTED`);
      } else {
        console.log(`✅ User ${identifier} is NOT blacklisted`);
      }

      return isBlacklisted;

    } catch (error: any) {
      // 404 means not found in blacklist = not blacklisted = good
      if (error.response?.status === 404) {
        console.log(`✅ User ${identifier} not in blacklist (404 - not found)`);
        return false;
      }
      
      // Other errors - fail-open for availability
      console.error(`⚠️  Karma API Error for ${identifier}:`, error.message);
      console.log('✅ Allowing registration (fail-open for availability)');
      return false;
    }
  }

  async reportToBlacklist(identifier: string, reason: string): Promise<boolean> {
    if (this.useMock) {
      console.log(`⚠️  MOCK: Would report ${identifier} to blacklist. Reason: ${reason}`);
      return true;
    }

    try {
      await axios.post(
        `${this.baseUrl}/verification/karma`,
        {
          identity: identifier,
          reason,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log(`✅ Reported ${identifier} to Karma blacklist`);
      return true;
    } catch (error: any) {
      console.error('❌ Karma Report Error:', error.message);
      return false;
    }
  }
}