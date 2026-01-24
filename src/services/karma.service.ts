import axios from 'axios';
import { config } from '../config/env';

export class KarmaService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = config.karma.baseUrl;
    this.apiKey = config.karma.apiKey;
  }

  async checkBlacklist(identifier: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/verification/karma/${identifier}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );


      return response.data?.status === 'blacklisted' || false;
    } catch (error: any) {

      if (error.response?.status === 404) {
        return false;
      }
      

      console.error('Karma API Error:', error.message);
      return false;
    }
  }

  async reportToBlacklist(
    identifier: string,
    reason: string
  ): Promise<boolean> {
    try {
      await axios.post(
        `${this.baseUrl}/verification/karma`,
        {
          identity: identifier,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return true;
    } catch (error: any) {
      console.error('Karma Report Error:', error.message);
      return false;
    }
  }
}