"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Shield, ChevronLeft, ChevronRight, AlertTriangle, Scale, Lightbulb,
  Database, FileText, BookOpen, ArrowLeft, Search
} from 'lucide-react';

// --- Mock Data Types ---
const dataTypes = [
  { id: 'fullName', label: 'Full Name', icon: '📄' },
  { id: 'idNic', label: 'ID / NIC', icon: '🆔' },
  { id: 'phone', label: 'Phone', icon: '📱' },
  { id: 'email', label: 'Email', icon: '💬' },
  { id: 'address', label: 'Address', icon: '📍' },
  { id: 'birthDate', label: 'Birth Date', icon: '📅' },
  { id: 'username', label: 'Username', icon: '👤' },
  { id: 'location', label: 'Location', icon: '🏢' },
];

const riskFactors = [
  { id: 'impersonation', label: 'Impersonation Detected', icon: '⚠️' },
  { id: 'imageExposed', label: 'Image / Photo Exposed', icon: '📸' },
];

// --- Mock Results Data ---
const mockScenarios = [
  {
    title: 'Identity Impersonation',
    badge: 'PRIMARY',
    confidence: 93,
    description: 'Someone is actively impersonating the victim or using their identity fraudulently. This triggers specific criminal provisions under the Online Safety Act.',
    color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
  },
  {
    title: 'General Data Exposure',
    badge: null,
    confidence: 48,
    description: 'Personal data has been made accessible publicly or to unauthorized parties. The context suggests general exposure rather than a targeted attack.',
    color: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
  },
];

const mockLegalClauses = [
  { code: 'OSA 18(a)', text: 'Online cheating by personation', score: 0.81, color: 'bg-green-500' },
  { code: 'OSA 18(c)', text: 'Online cheating by personation', score: 0.81, color: 'bg-green-500' },
  { code: 'OSA 18(b)', text: 'Online cheating by personation', score: 0.79, color: 'bg-yellow-500' },
  { code: 'CCA 4(b)', text: 'Securing unauthorized access to information with intent', score: 0.78, color: 'bg-red-500' },
];

const mockRecommendations = [
  'File a complaint with the Sri Lanka CERT (Computer Emergency Readiness Team)',
  'Report the impersonation to the relevant social media platform',
  'Document all evidence of impersonation for legal proceedings',
  'Consider filing a complaint under the Online Safety Act',
  'Enable two-factor authentication on all accounts',
  'Monitor your accounts for unauthorized activity',
  'Consider a credit freeze to prevent identity theft',
];

type TabKey = 'clauses' | 'why' | 'recommendations' | 'coverage';

export default function RiskScoringPage() {
  const [view, setView] = useState<'input' | 'results'>('input');
  const [selectedData, setSelectedData] = useState<string[]>(['fullName']);
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['imageExposed']);
  const [platform, setPlatform] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('clauses');

  const toggleData = (id: string) => {
    setSelectedData(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const toggleFactor = (id: string) => {
    setSelectedFactors(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    setView('results');
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'clauses', label: `Legal Clauses (${mockLegalClauses.length})`, icon: <Scale className="w-3.5 h-3.5" /> },
    { key: 'why', label: 'Why It Applies', icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { key: 'recommendations', label: `Recommendations (${mockRecommendations.length})`, icon: <BookOpen className="w-3.5 h-3.5" /> },
    { key: 'coverage', label: 'Data Coverage', icon: <Database className="w-3.5 h-3.5" /> },
  ];

  // ========== INPUT VIEW ==========
  if (view === 'input') {
    return (
      <DashboardLayout>
        <div className="-mx-3 md:-mx-6 -mt-3 md:-mt-6 bg-card border-b border-border pb-24 pt-12 md:pt-16 px-3 md:px-6 text-center text-foreground">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 md:h-10 md:w-10 text-primary drop-shadow-[0_0_12px_rgba(0,200,255,0.5)]" />
            Privacy Advisor
            <span className="text-muted-foreground text-lg">⊙</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-light">
            Sri Lanka — Data Exposure Risk & Legal Guidance
          </p>
        </div>

        <div className="max-w-2xl mx-auto -mt-12 relative z-10 space-y-6">
          <Card className="border-border bg-background shadow-xl overflow-hidden">
            <CardContent className="p-4 md:p-8 space-y-6">

              {/* Search/Context Field */}
              <Input
                placeholder="Describe the situation (optional)"
                className="bg-muted/50 border-border h-12 text-sm"
              />

              {/* Data Types Checkboxes */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
                  What personal data has been exposed?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dataTypes.map(dt => (
                    <label
                      key={dt.id}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedData.includes(dt.id)
                            ? 'bg-destructive border-destructive'
                            : 'border-muted-foreground/40 group-hover:border-primary/60'
                        }`}
                        onClick={() => toggleData(dt.id)}
                      >
                        {selectedData.includes(dt.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-foreground">
                        {dt.icon} {dt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Risk Factors */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
                  Additional Risk Factors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {riskFactors.map(rf => (
                    <label
                      key={rf.id}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedFactors.includes(rf.id)
                            ? 'bg-destructive border-destructive'
                            : 'border-muted-foreground/40 group-hover:border-primary/60'
                        }`}
                        onClick={() => toggleFactor(rf.id)}
                      >
                        {selectedFactors.includes(rf.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-foreground">
                        {rf.icon} {rf.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Platform Input */}
              <Input
                placeholder="🌐 Which platform? (e.g. Facebook, Telegram)"
                value={platform}
                onChange={e => setPlatform(e.target.value)}
                className="bg-muted/50 border-border h-12 text-sm"
              />

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                className="w-full h-14 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
              >
                <Search className="w-5 h-5 mr-2" />
                Analyze My Risk
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // ========== RESULTS VIEW ==========
  const score = 45;
  const severity = score < 30 ? 'LOW' : score < 60 ? 'MODERATE' : score < 80 ? 'HIGH' : 'CRITICAL';
  const severityColor = score < 30 ? 'text-green-500' : score < 60 ? 'text-yellow-400' : score < 80 ? 'text-orange-500' : 'text-destructive';

  return (
    <DashboardLayout>
      <div className="-mx-3 md:-mx-6 -mt-3 md:-mt-6 bg-card border-b border-border pb-6 pt-4 md:pt-6 px-3 md:px-6">
        <Button
          variant="outline"
          size="sm"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={() => setView('input')}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Input
        </Button>
      </div>

      <div className="max-w-3xl mx-auto mt-4 md:mt-6 space-y-6">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
            <Shield className="w-7 h-7 text-primary" />
            Risk Report
          </h1>
        </div>

        {/* Score Card */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-purple-800/10 overflow-hidden">
          <CardContent className="py-8 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-400 font-semibold">Privacy Risk Score</p>
            <p className={`text-6xl md:text-7xl font-black ${severityColor}`}>{score}</p>
            <p className={`text-lg font-bold tracking-wider ${severityColor}`}>{severity}</p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed">
              Someone is actively impersonating the victim or using their identity fraudulently. This triggers specific criminal provisions under the Online Safety Act.
            </p>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: selectedData.length, label: 'Data Types Exposed' },
            { value: mockScenarios.length, label: 'Scenarios Detected' },
            { value: mockLegalClauses.length + 1, label: 'Laws Triggered' },
          ].map((stat, i) => (
            <Card key={i} className="border-border bg-background text-center">
              <CardContent className="py-4 md:py-6">
                <p className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Exposed Data Inputs */}
        <Card className="border-border bg-background">
          <CardContent className="py-4 px-4 md:px-6">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Exposed Data Inputs</p>
            <div className="flex flex-wrap gap-2">
              {selectedData.map(id => {
                const dt = dataTypes.find(d => d.id === id);
                return dt ? (
                  <Badge key={id} variant="secondary" className="bg-muted text-foreground text-xs px-3 py-1">
                    {dt.icon} {dt.label}
                  </Badge>
                ) : null;
              })}
              {selectedFactors.includes('impersonation') && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs px-3 py-1">
                  ⚠️ Impersonation
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detected Scenarios */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Detected Scenarios
          </h2>
          {mockScenarios.map((s, i) => (
            <Card key={i} className={`border-l-4 ${s.color} overflow-hidden`}>
              <CardContent className="py-4 px-4 md:px-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                    {s.badge && (
                      <Badge variant="outline" className="text-[10px] border-yellow-500/50 text-yellow-400 px-1.5 py-0">
                        {s.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-mono text-primary">{s.confidence}% confidence</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expandable Sections */}
        <div className="space-y-2">
          <Card className="border-border bg-background cursor-pointer hover:bg-muted/30 transition-colors">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">💡 Real-world examples of these scenarios</span>
            </CardContent>
          </Card>
          <Card className="border-border bg-background cursor-pointer hover:bg-muted/30 transition-colors">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">📊 What drove the severity score?</span>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1 border-b border-border pb-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-md transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary/10 text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'clauses' && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Which laws specifically protect each exposed data type:</p>
              <Card className="border-border bg-muted/30">
                <CardContent className="py-3 px-4">
                  <span className="text-sm text-foreground">📄 Full Name</span>
                  <p className="text-xs text-muted-foreground mt-1 italic">No specific legal provisions matched.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-yellow-500/50 bg-background">
                <CardContent className="py-4 px-4 md:px-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      Impersonation
                    </h4>
                    <span className="text-xs text-muted-foreground">{mockLegalClauses.length} clauses · 4 primary</span>
                  </div>
                  {mockLegalClauses.map((clause, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-primary font-mono">• {clause.code} — <span className="text-muted-foreground font-sans">{clause.text}</span></span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className={`h-full rounded-full ${clause.color}`} style={{ width: `${clause.score * 100}%` }} />
                        </div>
                        <span className="text-xs text-destructive font-mono">{clause.score.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'why' && (
            <Card className="border-border bg-background">
              <CardContent className="py-6 px-4 md:px-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The risk score was calculated based on the combination of exposed data types and detected risk factors.
                  The presence of <span className="text-primary font-semibold">impersonation</span> significantly increases the severity
                  as it triggers criminal provisions under Sri Lanka&apos;s Online Safety Act (OSA).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full Name exposure combined with impersonation creates a high-confidence match for
                  identity fraud scenarios under OSA Section 18.
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'recommendations' && (
            <Card className="border-border bg-background">
              <CardContent className="py-4 px-4 md:px-6">
                <ul className="space-y-3">
                  {mockRecommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {activeTab === 'coverage' && (
            <Card className="border-border bg-background">
              <CardContent className="py-6 px-4 md:px-6 space-y-3">
                <p className="text-sm text-muted-foreground">Data types analyzed and their coverage in Sri Lankan law:</p>
                {selectedData.map(id => {
                  const dt = dataTypes.find(d => d.id === id);
                  return dt ? (
                    <div key={id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{dt.icon} {dt.label}</span>
                      <Badge variant="outline" className="text-xs border-green-500/50 text-green-400">Covered</Badge>
                    </div>
                  ) : null;
                })}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 pb-8">
          <p className="text-xs text-muted-foreground">
            Processing model: cyber-sentinel | Clauses: LK-§5
          </p>
          <Button
            onClick={() => setView('input')}
            className="w-full h-14 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Analyze Again
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
