export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface LegalClause {
  id: string;
  code: string; // e.g., "PDPA Act No. 9 of 2022"
  section: string;
  description: string;
  fullText: string;
  explanation: string;
  penalty: string;
  matchedTags: string[];
  relevanceScore: number; // 0-100
  reasons: string[];
  confidenceLevel: 'high' | 'medium' | 'low';
}

export interface RiskRecommendation {
  id: string;
  text: string;
  severity: RiskLevel;
  category: string;
}

export interface RiskAssessmentResult {
  scanId: string;
  status: 'idle' | 'analyzing' | 'completed' | 'failed';
  inferredScenario: string;
  overallScore: number; // 0-100
  riskLevel: RiskLevel;
  matchedClauses: LegalClause[];
  recommendations: RiskRecommendation[];
}
