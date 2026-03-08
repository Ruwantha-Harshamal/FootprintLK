import { ScanResult } from '../types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/social-media';

export const mockSocialMediaService = {
  startScan: async (targetName: string): Promise<ScanResult> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/scan`, { targetName });
      return response.data;
    } catch (error) {
      console.error('Failed to start scan:', error);
      throw error;
    }
  },

  pollScanProgress: async (scanId: string, currentProgress: number): Promise<Partial<ScanResult>> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/scan/${scanId}`);
      return response.data;
    } catch (error) {
      console.error('Error polling scan progress:', error);
      throw error;
    }
  }
};
