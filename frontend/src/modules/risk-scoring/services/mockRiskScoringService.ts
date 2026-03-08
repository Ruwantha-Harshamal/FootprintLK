import { RiskAssessmentResult } from '../types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/risk-scoring';

export const mockRiskScoringService = {
  assessRisk: async (data: any): Promise<RiskAssessmentResult> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/assess`, data);
      return response.data;
    } catch (error) {
       console.error("Failed to start risk assessment:", error);
       throw error;
    }
  },

  pollAssessmentProgress: async (scanId: string): Promise<Partial<RiskAssessmentResult>> => {
      try {
        const response = await axios.get(`${API_BASE_URL}/assess/${scanId}`);
        return response.data;
      } catch (error) {
        console.error("Error polling risk assessment:", error);
        throw error;
      }
  }
};
