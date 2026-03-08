"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Scale, Activity, FileText, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockRiskScoringService } from '../services/mockRiskScoringService';
import { RiskAssessmentResult, RiskLevel } from '../types';

export function RiskScoringDashboard() {
  const [dataInput, setDataInput] = useState('');
  const [flags, setFlags] = useState({ impersonation: false, imageExposure: false, passwordLeak: false });
  const [platform, setPlatform] = useState('');
  
  const [assessment, setAssessment] = useState<RiskAssessmentResult>({
    scanId: '',
    status: 'idle',
    inferredScenario: '',
    overallScore: 0,
    riskLevel: 'low',
    matchedClauses: [],
    recommendations: []
  });

  const handleRunAssessment = async () => {
    if (!dataInput.trim()) return;
    
    // Set loading state immediately for UI responsiveness
    setAssessment(prev => ({ ...prev, status: 'analyzing' }));

    try {
      const initialResult = await mockRiskScoringService.assessRisk({
          dataInput,
          flags,
          platform: platform || 'other'
      });
      setAssessment(initialResult);
    } catch (e) {
      console.error("Failed", e);
      setAssessment(prev => ({ ...prev, status: 'failed' }));
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (assessment.status === 'analyzing' && assessment.scanId) {
      timeout = setTimeout(async () => {
        try {
          const update = await mockRiskScoringService.pollAssessmentProgress(assessment.scanId);
          if (update && update.status) {
              setAssessment(prev => ({ ...prev, ...update }));
          }
        } catch (e) {
             // Handle error
        }
      }, 2500);
    }
    return () => clearTimeout(timeout);
  }, [assessment.status, assessment.scanId]);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'critical': return 'bg-red-500 hover:bg-red-600 text-white';
      case 'high': return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'low': return 'bg-green-500 hover:bg-green-600 text-white';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {assessment.status === 'idle' || assessment.status === 'analyzing' ? (
        <Card>
          <CardHeader>
            <CardTitle>Input Exposure Data</CardTitle>
            <CardDescription>Enter exposed data and context for AI privacy scenario inference.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Exposed Information</label>
              <Textarea 
                placeholder="e.g., Name, ID number, phone, email, address..."
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                disabled={assessment.status === 'analyzing'}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Incident Flags</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="impersonation" checked={flags.impersonation} onCheckedChange={(c) => setFlags(f => ({ ...f, impersonation: !!c }))} disabled={assessment.status === 'analyzing'} />
                    <label htmlFor="impersonation" className="text-sm">Impersonation Attempt</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="image" checked={flags.imageExposure} onCheckedChange={(c) => setFlags(f => ({ ...f, imageExposure: !!c }))} disabled={assessment.status === 'analyzing'} />
                    <label htmlFor="image" className="text-sm">Image/Media Exposure</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="password" checked={flags.passwordLeak} onCheckedChange={(c) => setFlags(f => ({ ...f, passwordLeak: !!c }))} disabled={assessment.status === 'analyzing'} />
                    <label htmlFor="password" className="text-sm">Password/Credential Leak</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Context / Platform</label>
                <Select value={platform} onValueChange={setPlatform} disabled={assessment.status === 'analyzing'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="darkweb">Dark Web Forum</SelectItem>
                    <SelectItem value="other">Other / Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {assessment.status === 'analyzing' && (
              <div className="space-y-6 py-6 animate-in fade-in duration-500 border-t mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <Cpu className="h-5 w-5" />
                    <span className="font-medium">Inferring privacy scenario and matching legal clauses...</span>
                  </div>
                  <Progress value={undefined} className="w-1/3 h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Skeleton className="h-[120px] md:col-span-2 rounded-xl" />
                  <Skeleton className="h-[120px] rounded-xl" />
                </div>
                
                <div className="space-y-4 pt-2">
                   <div className="flex gap-2 mb-4">
                     <Skeleton className="h-10 w-32" />
                     <Skeleton className="h-10 w-32" />
                   </div>
                   <Skeleton className="h-[200px] w-full rounded-xl" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-muted/30 border-t px-6 py-4">
            <Button onClick={handleRunAssessment} disabled={!dataInput.trim() || assessment.status === 'analyzing'} className="w-full md:w-auto">
              Run Legal & Risk Assessment
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Assessment Results</h2>
            <Button variant="outline" onClick={() => setAssessment({ ...assessment, status: 'idle' })}>New Assessment</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary">Inferred Scenario</h3>
                    <p className="text-2xl font-bold mt-1">{assessment.inferredScenario}</p>
                    <p className="text-muted-foreground mt-2">
                      Based on the provided data, flags, and platform context, our AI has identified this as the highest probability privacy threat scenario. 
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col items-center justify-center p-6 text-center">
              <div className="text-sm font-medium text-muted-foreground mb-2">Overall Risk Score</div>
              <div className="text-6xl font-black mb-2">{assessment.overallScore}</div>
              <Badge className={`text-base px-4 py-1 uppercase ${getRiskColor(assessment.riskLevel)}`}>
                {assessment.riskLevel} RISK
              </Badge>
            </Card>
          </div>

          <Tabs defaultValue="narrative" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="narrative">Narrative Summary</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Legal View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="narrative" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>What this means for you</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-relaxed">
                    Your exposure is categorized as <strong>{assessment.riskLevel.toUpperCase()}</strong>. 
                    In this scenario, we detected unauthorized exposure of your data which closely aligns with 
                    <strong> Identity Theft and Impersonation</strong> patterns. 
                  </p>
                  <p className="leading-relaxed">
                    Under Sri Lankan law, specifically the <strong>Personal Data Protection Act (PDPA)</strong> and the <strong>Penal Code</strong>,
                    those responsible for this exposure may be subject to significant fines (up to LKR 10 Million) or imprisonment.
                  </p>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                      Recommended Actions
                    </h4>
                    <ul className="space-y-3">
                      {assessment.recommendations.map(rec => (
                        <li key={rec.id} className="flex gap-3 bg-muted/50 p-3 rounded-md border">
                          <Badge className={getRiskColor(rec.severity)}>{rec.category}</Badge>
                          <span className="text-sm">{rec.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Scale className="h-6 w-6" /> Matched Legal Clauses
                </h3>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  className="space-y-4"
                >
                  {assessment.matchedClauses.map((clause, index) => (
                    <motion.div 
                      key={clause.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-6 flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-bold text-lg">{clause.code}</h4>
                                  <Badge variant="outline">{clause.section}</Badge>
                                </div>
                                <p className="font-medium text-primary">{clause.description}</p>
                              </div>
                            </div>
                            
                            <div className="bg-muted p-4 rounded-md text-sm font-serif border-l-4 border-primary/50 italic">
                              "{clause.fullText}"
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Explanation</p>
                                <p className="text-sm">{clause.explanation}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Potential Penalty</p>
                                <p className="text-sm text-red-500/80 font-medium">{clause.penalty}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Matched Tags</p>
                              <div className="flex flex-wrap gap-2">
                                {clause.matchedTags.map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 p-6 border-t md:border-t-0 md:border-l flex flex-col gap-4 md:w-64 shrink-0 justify-center">
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground mb-1">Relevance Score</div>
                              <div className="text-3xl font-bold">{clause.relevanceScore}%</div>
                              <Badge variant={clause.confidenceLevel === 'high' ? 'default' : 'secondary'} className="mt-2">
                                {clause.confidenceLevel} confidence
                              </Badge>
                            </div>
                            
                            <div className="text-xs bg-background p-3 rounded border">
                              <span className="font-semibold block mb-1">AI Reasoning:</span>
                              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                                {clause.reasons.map((r, i) => <li key={i}>{r}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
}
