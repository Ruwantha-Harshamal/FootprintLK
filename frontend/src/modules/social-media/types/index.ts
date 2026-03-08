export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ExtractedPII {
  id: string;
  type: string; // e.g., 'Email', 'Phone', 'Location', 'Education'
  value: string;
  source: string; // e.g., 'Facebook', 'LinkedIn'
  riskLevel: RiskLevel;
}

export interface SocialProfile {
  id: string;
  platform: string; // 'Facebook', 'LinkedIn', 'Instagram', 'Twitter'
  username: string;
  fullName: string;
  profileUrl: string;
  avatarUrl?: string;
  matchScore: number; // 0-100
  isImpersonationRisk: boolean;
  status: 'confirmed' | 'pending' | 'rejected';
  extractedData: ExtractedPII[];
}

export interface ScanResult {
  scanId: string;
  targetName: string;
  status: 'idle' | 'scanning' | 'completed' | 'failed';
  progress: number;
  profilesFound: SocialProfile[];
  summary: {
    totalProfiles: number;
    criticalRiskItems: number;
    highRiskItems: number;
    impersonationThreats: number;
  };
  recommendations: { id: string; text: string; severity: RiskLevel }[];
}
