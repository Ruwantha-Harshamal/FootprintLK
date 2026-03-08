import { ScanResult } from '../types';

// Purely client-side mock service — no backend calls required
export const mockSocialMediaService = {
  startScan: async (targetName: string): Promise<ScanResult> => {
    // Simulate a short network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      scanId: `scan-${Date.now()}`,
      targetName,
      status: 'scanning',
      progress: 0,
      profilesFound: [],
      summary: { totalProfiles: 0, criticalRiskItems: 0, highRiskItems: 0, impersonationThreats: 0 },
      recommendations: [],
    };
  },

  pollScanProgress: async (_scanId: string, currentProgress: number): Promise<Partial<ScanResult>> => {
    // Simulate incremental progress
    await new Promise(resolve => setTimeout(resolve, 300));

    const newProgress = Math.min(currentProgress + Math.floor(Math.random() * 15) + 10, 100);

    if (newProgress >= 100) {
      // Return full mock results when scan completes
      return {
        status: 'completed',
        progress: 100,
        profilesFound: [
          {
            id: 'p1',
            platform: 'Instagram',
            username: 'target_alias',
            fullName: 'Target User',
            profileUrl: 'https://instagram.com/target_alias',
            matchScore: 83,
            isImpersonationRisk: false,
            status: 'confirmed',
            extractedData: [
              { id: 'e1', type: 'EDU_RECORD', value: 'Law (Grad) ⚖️', source: 'Instagram', riskLevel: 'high' },
              { id: 'e2', type: 'EMP_RECORD', value: 'Social media manager', source: 'Instagram', riskLevel: 'high' },
              { id: 'e3', type: 'LOCATION', value: 'Colombo, Sri Lanka', source: 'Instagram', riskLevel: 'low' },
            ],
          },
          {
            id: 'p2',
            platform: 'Facebook',
            username: 'target.user.fb',
            fullName: 'Target User',
            profileUrl: 'https://facebook.com/target.user.fb',
            matchScore: 76,
            isImpersonationRisk: true,
            status: 'confirmed',
            extractedData: [
              { id: 'e4', type: 'PHONE', value: '+94 7X XXX XXXX', source: 'Facebook', riskLevel: 'critical' },
              { id: 'e5', type: 'EMAIL', value: 't***@gmail.com', source: 'Facebook', riskLevel: 'high' },
              { id: 'e6', type: 'WORKPLACE', value: 'ABC Corp', source: 'Facebook', riskLevel: 'medium' },
            ],
          },
        ],
        summary: {
          totalProfiles: 2,
          criticalRiskItems: 1,
          highRiskItems: 3,
          impersonationThreats: 1,
        },
        recommendations: [
          { id: 'r1', text: 'Review privacy settings on Instagram — bio and profile info are fully public.', severity: 'high' },
          { id: 'r2', text: 'Potential impersonation detected on Facebook. Verify profile ownership.', severity: 'critical' },
          { id: 'r3', text: 'Reduce publicly visible workplace information to prevent spear-phishing.', severity: 'medium' },
          { id: 'r4', text: 'Remove phone number from public-facing Facebook profile.', severity: 'high' },
        ],
      };
    }

    return {
      status: 'scanning',
      progress: newProgress,
    };
  },
};
