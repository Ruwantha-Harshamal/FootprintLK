# Module 4: Risk Scoring

## Purpose
Aggregates data from all modules to provide a unified privacy risk score and actionable recommendations.

## Features (Planned)
- Overall risk score (0-100)
- Risk breakdown by category
- Historical risk tracking
- Actionable recommendations
- PDPA compliance guidance

## Folder Structure
```
risk-scoring/
├── components/          # UI components for this module
│   ├── RiskScoreGauge.tsx      # Main risk score display
│   ├── RiskBreakdown.tsx       # Category breakdown
│   ├── RiskTimeline.tsx        # Historical chart
│   ├── RecommendationsCard.tsx # Action items
│   └── ComplianceGuide.tsx     # PDPA guidance
├── hooks/              # Custom hooks
│   ├── useRiskScore.ts
│   └── useRiskHistory.ts
├── services/           # API services
│   └── riskScoringApi.ts
└── types/              # TypeScript types
    └── index.ts
```

## Risk Calculation Factors
1. **Data Breach Exposure** (High weight)
   - Plaintext passwords
   - Recent breaches
   - Number of breaches

2. **Social Media Exposure** (Medium weight)
   - Public personal info
   - Cross-platform correlation
   - Sensitive data visibility

3. **Image Reuse** (High weight)
   - Unauthorized use
   - Impersonation risk
   - Number of occurrences

4. **Temporal Factors**
   - Breach recency
   - Exposure duration

## Risk Levels
- **0-25:** Low Risk (Green)
- **26-50:** Medium Risk (Yellow)
- **51-75:** High Risk (Orange)
- **76-100:** Critical Risk (Red)

## Status
🚧 **Coming Soon** - Requires data from other modules

## Backend Requirements
- [ ] Risk calculation engine
- [ ] Weighted scoring algorithm
- [ ] Recommendation engine
- [ ] Historical tracking database
