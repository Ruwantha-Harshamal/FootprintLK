"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Facebook, Instagram, Info, ArrowLeft, Download, FileText, CheckCircle, ShieldAlert, GraduationCap, Briefcase, ExternalLink, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockSocialMediaService } from '../services/mockSocialMediaService';
import { ScanResult } from '../types';

export function SocialMediaDashboard() {
  const [targetName, setTargetName] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'facebook' | 'instagram'>('instagram');
  const [scanResult, setScanResult] = useState<ScanResult>({
    scanId: '',
    targetName: '',
    status: 'idle',
    progress: 0,
    profilesFound: [],
    summary: { totalProfiles: 0, criticalRiskItems: 0, highRiskItems: 0, impersonationThreats: 0 },
    recommendations: []
  });

  const handleStartAnalysis = async () => {
    if (!targetName.trim()) return;
    try {
      setScanResult(prev => ({ ...prev, status: 'scanning', progress: 0 }));
      const initialResult = await mockSocialMediaService.startScan(targetName);
      setScanResult({ ...initialResult, progress: 0 }); 
    } catch (e) {
      console.error(e);
      setScanResult(prev => ({ ...prev, status: 'idle' }));
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scanResult.status === 'scanning' && scanResult.progress < 100) {
      interval = setInterval(async () => {
        try {
          const update = await mockSocialMediaService.pollScanProgress(scanResult.scanId, scanResult.progress);
          setScanResult(prev => ({ ...prev, ...update }));
        } catch (e) {
             clearInterval(interval);
        }
      }, 800);
    }
    return () => clearInterval(interval);
  }, [scanResult.status, scanResult.progress, scanResult.scanId]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {scanResult.status === 'idle' || scanResult.status === 'scanning' ? (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <Card className="w-full max-w-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-border bg-card">
              <CardContent className="p-8 md:p-10">
                <div className="space-y-8">
                  {/* Input Section */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground tracking-wide uppercase">Enter Target Identifier</label>
                    <Input
                      placeholder="e.g., Dushan or දුෂාන්"
                      className="text-base py-6 px-4 bg-background border-border focus-visible:ring-primary shadow-[0_0_15px_rgba(0,255,255,0.05)]"
                      value={targetName}
                      onChange={(e) => setTargetName(e.target.value)}
                      disabled={scanResult.status === 'scanning'}
                    />
                    <p className="text-xs text-muted-foreground">Supports English and Sinhala (සිංහල) input</p>
                  </div>

                  {/* Platform Selection */}
                  <div className="space-y-4 text-center">
                    <div>
                      <h3 className="text-sm font-medium text-foreground tracking-wide uppercase">Target Vector</h3>
                      <p className="text-xs text-muted-foreground">Select surface area to scan</p>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button 
                        variant="outline" 
                        type="button"
                        onClick={() => setSelectedPlatform('facebook')}
                        disabled={scanResult.status === 'scanning'}
                        className={`py-6 px-8 rounded-md flex items-center gap-2 transition-all duration-300 ${
                          selectedPlatform === 'facebook' 
                            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,255,255,0.2)]' 
                            : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/30'
                        }`}
                      >
                        <Facebook className={`h-5 w-5 ${selectedPlatform === 'facebook' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="font-medium tracking-wide">Facebook</span>
                        {selectedPlatform === 'facebook' && <CheckCircle className="h-4 w-4 ml-1" />}
                      </Button>

                      <Button 
                        variant="outline" 
                        type="button"
                        onClick={() => setSelectedPlatform('instagram')}
                        disabled={scanResult.status === 'scanning'}
                        className={`py-6 px-8 rounded-md flex items-center gap-2 transition-all duration-300 ${
                          selectedPlatform === 'instagram' 
                            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,255,255,0.2)]' 
                            : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/30'
                        }`}
                      >
                        <Instagram className={`h-5 w-5 ${selectedPlatform === 'instagram' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="font-medium tracking-wide">Instagram</span>
                        {selectedPlatform === 'instagram' && <CheckCircle className="h-4 w-4 ml-1" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground italic lowercase font-mono">[{selectedPlatform}_selected]</p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button 
                      onClick={handleStartAnalysis} 
                      disabled={!targetName.trim() || scanResult.status === 'scanning'}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all relative overflow-hidden tracking-widest uppercase"
                    >
                      {scanResult.status === 'scanning' ? (
                        <>
                          <div className="absolute inset-0 bg-background/20" style={{ width: `${scanResult.progress}%`, transition: 'width 0.5s ease' }} />
                          <Activity className="animate-spin h-5 w-5 mr-2 relative z-10" />
                          <span className="relative z-10">Initializing Routine... {scanResult.progress}%</span>
                        </>
                      ) : (
                        'Execute Scan'
                      )}
                    </Button>
                  </div>

                  {/* Informational Box */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary text-sm mb-1 tracking-wide uppercase">Operational Protocol:</h4>
                        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1.5 ml-1">
                          <li>Configure target vectors and parameters</li>
                          <li>Execute cross-reference data scraping algorithms</li>
                          <li>Analyze profiles for critical PII and impersonation risks</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header / Sub-navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground hover:bg-muted -ml-2 transition-colors uppercase tracking-wider text-xs"
                  onClick={() => setScanResult(prev => ({ ...prev, status: 'idle', progress: 0 }))}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Terminate
                </Button>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-foreground tracking-wide uppercase">Threat Report</span>
                  <Badge variant="secondary" className="bg-muted text-foreground border border-border rounded-sm font-mono text-xs shadow-none">
                    TARGET: {targetName}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-border text-muted-foreground bg-background hover:bg-muted hover:text-foreground transition-all">
                  <Download className="h-4 w-4 mr-2" /> Export Log
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_10px_rgba(0,255,255,0.2)] tracking-wide uppercase text-xs"
                  onClick={() => setScanResult(prev => ({ ...prev, status: 'idle', progress: 0, targetName: '' }))}
                >
                  New Trace
                </Button>
              </div>
            </div>

            {/* Exposure Summary Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground tracking-wide uppercase border-l-2 border-primary pl-2">Risk Matrix</h2>
              <Card className="shadow-lg border-border bg-card">
                <CardContent className="p-6">
                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="border border-destructive/30 bg-destructive/10 rounded-lg p-5 flex flex-col items-center justify-center text-center shadow-[inset_0_0_15px_rgba(255,0,0,0.05)]">
                      <span className="text-4xl font-bold text-destructive mb-1 font-mono">0</span>
                      <span className="text-xs font-bold text-destructive/80 tracking-wider uppercase">Critical Vectors</span>
                    </div>
                    <div className="border border-orange-500/30 bg-orange-500/10 rounded-lg p-5 flex flex-col items-center justify-center text-center shadow-[inset_0_0_15px_rgba(255,165,0,0.05)]">
                      <span className="text-4xl font-bold text-orange-500 mb-1 font-mono">3</span>
                      <span className="text-xs font-bold text-orange-500/80 tracking-wider uppercase">High Alert</span>
                    </div>
                    <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-lg p-5 flex flex-col items-center justify-center text-center shadow-[inset_0_0_15px_rgba(255,255,0,0.05)]">
                      <span className="text-4xl font-bold text-yellow-500 mb-1 font-mono">0</span>
                      <span className="text-xs font-bold text-yellow-500/80 tracking-wider uppercase">Elevated</span>
                    </div>
                    <div className="border border-green-500/30 bg-green-500/10 rounded-lg p-5 flex flex-col items-center justify-center text-center shadow-[inset_0_0_15px_rgba(0,255,0,0.05)]">
                      <span className="text-4xl font-bold text-green-500 mb-1 font-mono">8</span>
                      <span className="text-xs font-bold text-green-500/80 tracking-wider uppercase">Low Priority</span>
                    </div>
                  </div>

                  {/* Scope Details */}
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 tracking-widest uppercase">Coverage Scope</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-muted text-foreground font-normal border-border">Facebook</Badge>
                      <Badge variant="outline" className="bg-muted text-foreground font-normal border-border">Instagram</Badge>
                      <Badge variant="outline" className="bg-transparent text-muted-foreground font-normal border-dashed border-border opacity-50">LinkedIn</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exposed PII Section */}
            <Card className="shadow-lg border-border bg-card overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-3">
                <div className="bg-primary/20 border border-primary/30 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-wide uppercase">Extracted Identifiers (PII)</h3>
                  <p className="text-xs text-muted-foreground">Classified data points exposed on the clearweb</p>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Platform Header */}
                <div className="bg-primary/5 border border-primary/20 rounded-md px-4 py-3 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground tracking-wide uppercase">Grid: Instagram</span>
                    <span className="text-muted-foreground mx-1">::</span>
                    <span className="text-muted-foreground font-mono text-sm">Target_Alias</span>
                    <span className="text-destructive text-xs ml-1 shadow-[0_0_5px_rgba(255,0,0,0.5)]">🔥</span>
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 font-mono">3 packets</span>
                </div>

                {/* List Items */}
                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="border border-border rounded-lg p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-background hover:border-primary/50 transition-all duration-300 shadow-sm relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500/50 group-hover:bg-orange-500 transition-colors" />
                    <div className="flex gap-4 items-start pl-2">
                      <div className="bg-muted border border-border p-2.5 rounded-md shrink-0 mt-1">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-orange-500/20 text-orange-500 border border-orange-500/30 uppercase text-[10px] px-1.5 py-0 rounded-sm font-bold shadow-none tracking-widest">High</Badge>
                          <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">EDU_RECORD</span>
                        </div>
                        <p className="text-lg font-semibold text-foreground font-mono">"Law (Grad) ⚖️"</p>
                        <div className="space-y-0.5 pt-1">
                          <p className="text-xs text-muted-foreground">
                            Intercepted via <span className="font-semibold text-primary uppercase">Instagram</span>
                          </p>
                          <p className="text-xs text-muted-foreground italic border-l border-primary/30 pl-2 mt-1 py-0.5">
                            Viable for targeted social engineering and password reset profiling.
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-2 font-mono flex items-center gap-2">
                            <span>src: <code className="bg-muted px-1.5 py-0.5 rounded text-primary border border-border">ig_bio_parse</code></span>
                            <span className="text-primary/40 text-[8px]">■■■</span>
                            <span>conf: <span className="text-primary font-bold">83%</span></span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/30 shadow-none shrink-0 transition-colors">
                      <ExternalLink className="h-4 w-4 mr-2" /> Inspect Block
                    </Button>
                  </div>

                  {/* Item 2 */}
                  <div className="border border-border rounded-lg p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-background hover:border-primary/50 transition-all duration-300 shadow-sm relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500/50 group-hover:bg-orange-500 transition-colors" />
                    <div className="flex gap-4 items-start pl-2">
                      <div className="bg-muted border border-border p-2.5 rounded-md shrink-0 mt-1">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-orange-500/20 text-orange-500 border border-orange-500/30 uppercase text-[10px] px-1.5 py-0 rounded-sm font-bold shadow-none tracking-widest">High</Badge>
                          <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">EMP_RECORD</span>
                        </div>
                        <p className="text-lg font-semibold text-foreground font-mono">"Social media manager"</p>
                        <div className="space-y-0.5 pt-1">
                          <p className="text-xs text-muted-foreground">
                            Intercepted via <span className="font-semibold text-primary uppercase">Instagram</span>
                          </p>
                          <p className="text-xs text-muted-foreground italic border-l border-primary/30 pl-2 mt-1 py-0.5">
                            High probability of exploitation via spear-phishing campaigns.
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-2 font-mono flex items-center gap-2">
                            <span>src: <code className="bg-muted px-1.5 py-0.5 rounded text-primary border border-border">ig_bio_parse</code></span>
                            <span className="text-primary/40 text-[8px]">■■■</span>
                            <span>conf: <span className="text-primary font-bold">83%</span></span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/30 shadow-none shrink-0 transition-colors">
                      <ExternalLink className="h-4 w-4 mr-2" /> Inspect Block
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
