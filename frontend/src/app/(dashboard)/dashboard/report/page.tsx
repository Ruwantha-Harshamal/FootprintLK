"use client";

import { useRef, useState } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  FileText, Download, Shield, ShieldAlert, Users, Image as ImageIcon,
  TrendingUp, AlertTriangle, Database, Key, ShieldCheck, Activity,
  Crosshair, ExternalLink, GraduationCap, Briefcase, Globe, Loader2
} from 'lucide-react';

export default function ReportPage() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const reportTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `FootprintLK_Report_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0a0e1a' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };
      await html2pdf().set(opt).from(reportRef.current).save();
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header with Export Button */}
      <div className="-mx-3 md:-mx-6 -mt-3 md:-mt-6 bg-card border-b border-border pb-6 pt-6 md:pt-8 px-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-5xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-foreground">
              <FileText className="w-7 h-7 text-primary" />
              Privacy Exposure Report
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Generated on {reportDate} at {reportTime}
            </p>
          </div>
          <Button
            onClick={handleExportPDF}
            disabled={exporting}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] px-6"
          >
            {exporting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating PDF...</>
            ) : (
              <><Download className="w-4 h-4 mr-2" /> Export as PDF</>
            )}
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="max-w-5xl mx-auto mt-6 space-y-8 pb-12" style={{ color: '#e2e8f0' }}>

        {/* ============ COVER SECTION ============ */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
          <CardContent className="py-8 md:py-12 text-center space-y-3">
            <div className="flex justify-center mb-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">FootprintLK</h2>
            <p className="text-sm text-muted-foreground tracking-wider uppercase">Digital Privacy Exposure Assessment</p>
            <Separator className="max-w-xs mx-auto my-4" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong className="text-foreground">Subject:</strong> demo@example.com</p>
              <p><strong className="text-foreground">Report ID:</strong> FLK-{Date.now().toString(36).toUpperCase()}</p>
              <p><strong className="text-foreground">Date:</strong> {reportDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* ============ EXECUTIVE SUMMARY ============ */}
        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-primary" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This report provides a comprehensive analysis of the subject&apos;s digital privacy exposure across four key areas:
              data breach detection, social media exposure, image/face recognition matches, and an aggregated risk score.
              The assessment identifies potential vulnerabilities and provides actionable recommendations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-black text-destructive">2</p>
                <p className="text-[10px] text-destructive/80 uppercase tracking-wider font-bold">Breaches Found</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-black text-blue-400">3</p>
                <p className="text-[10px] text-blue-400/80 uppercase tracking-wider font-bold">PII Exposed</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-black text-green-400">1</p>
                <p className="text-[10px] text-green-400/80 uppercase tracking-wider font-bold">Image Matches</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-black text-orange-400">45</p>
                <p className="text-[10px] text-orange-400/80 uppercase tracking-wider font-bold">Risk Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ============ MODULE 1: DATA BREACH DETECTION ============ */}
        <Card className="border-destructive/30 bg-background overflow-hidden">
          <CardHeader className="bg-destructive/5 border-b border-destructive/20">
            <CardTitle className="flex items-center gap-2 text-lg text-destructive">
              <ShieldAlert className="w-5 h-5" />
              1. Data Breach Detection
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              We scanned known data dumps and dark web repositories. The following breaches involve the subject&apos;s data:
            </p>

            {/* Breach 1 */}
            <div className="border border-destructive/20 bg-destructive/5 rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/20 p-2.5 rounded-md"><Database className="h-5 w-5 text-destructive" /></div>
                  <div>
                    <h4 className="font-bold text-foreground">GlobalTicket Network</h4>
                    <p className="text-xs text-muted-foreground">Compromised: Oct 24, 2024</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge variant="outline" className="border-destructive/50 text-destructive text-[10px]">Email Addresses</Badge>
                      <Badge variant="outline" className="border-destructive/50 text-destructive text-[10px]">Passwords</Badge>
                      <Badge variant="outline" className="border-destructive/50 text-destructive text-[10px]">IP Addresses</Badge>
                    </div>
                  </div>
                </div>
                <Badge className="bg-destructive hover:bg-destructive/90 shrink-0">Critical</Badge>
              </div>
            </div>

            {/* Breach 2 */}
            <div className="border border-orange-500/20 bg-orange-500/5 rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500/20 p-2.5 rounded-md"><Key className="h-5 w-5 text-orange-500" /></div>
                  <div>
                    <h4 className="font-bold text-foreground">FitTracker App</h4>
                    <p className="text-xs text-muted-foreground">Compromised: Jan 12, 2023</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge variant="outline" className="border-orange-500/50 text-orange-400 text-[10px]">Email Addresses</Badge>
                      <Badge variant="outline" className="border-orange-500/50 text-orange-400 text-[10px]">Full Names</Badge>
                      <Badge variant="outline" className="border-orange-500/50 text-orange-400 text-[10px]">Dates of Birth</Badge>
                    </div>
                  </div>
                </div>
                <Badge className="bg-orange-500 hover:bg-orange-600 shrink-0">Elevated</Badge>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="border border-green-500/20 bg-green-500/5 rounded-lg p-4">
              <h4 className="flex items-center gap-2 font-bold text-green-400 text-sm mb-2">
                <ShieldCheck className="w-4 h-4" /> Recommended Actions
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside ml-1">
                <li>Change your password on GlobalTicket Network immediately</li>
                <li>Enable Multi-Factor Authentication on your email provider</li>
                <li>Check if the breached password is reused on other accounts</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* ============ MODULE 2: SOCIAL MEDIA EXPOSURE ============ */}
        <Card className="border-blue-500/30 bg-background overflow-hidden">
          <CardHeader className="bg-blue-500/5 border-b border-blue-500/20">
            <CardTitle className="flex items-center gap-2 text-lg text-blue-400">
              <Users className="w-5 h-5" />
              2. Social Media Exposure
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Cross-platform analysis of publicly accessible personal information. 2 profiles identified across Facebook and Instagram.
            </p>

            {/* Risk Matrix */}
            <div className="grid grid-cols-4 gap-2">
              <div className="border border-destructive/30 bg-destructive/10 rounded-lg p-3 text-center">
                <span className="text-xl font-black text-destructive font-mono">0</span>
                <p className="text-[9px] text-destructive/80 uppercase tracking-wider font-bold">Critical</p>
              </div>
              <div className="border border-orange-500/30 bg-orange-500/10 rounded-lg p-3 text-center">
                <span className="text-xl font-black text-orange-500 font-mono">3</span>
                <p className="text-[9px] text-orange-500/80 uppercase tracking-wider font-bold">High</p>
              </div>
              <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-lg p-3 text-center">
                <span className="text-xl font-black text-yellow-500 font-mono">1</span>
                <p className="text-[9px] text-yellow-500/80 uppercase tracking-wider font-bold">Elevated</p>
              </div>
              <div className="border border-green-500/30 bg-green-500/10 rounded-lg p-3 text-center">
                <span className="text-xl font-black text-green-500 font-mono">8</span>
                <p className="text-[9px] text-green-500/80 uppercase tracking-wider font-bold">Low</p>
              </div>
            </div>

            {/* Extracted PII Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Extracted Identifiers</h4>
              {[
                { type: 'EDU_RECORD', value: 'Law (Grad) ⚖️', platform: 'Instagram', risk: 'high', icon: GraduationCap, conf: '83%' },
                { type: 'EMP_RECORD', value: 'Social media manager', platform: 'Instagram', risk: 'high', icon: Briefcase, conf: '83%' },
                { type: 'LOCATION', value: 'Colombo, Sri Lanka', platform: 'Facebook', risk: 'medium', icon: Globe, conf: '91%' },
              ].map((item, i) => (
                <div key={i} className="border border-border rounded-lg p-3 flex items-start gap-3 bg-muted/20">
                  <div className="bg-muted border border-border p-2 rounded-md">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge className={`text-[10px] px-1.5 py-0 rounded-sm font-bold shadow-none tracking-widest uppercase ${
                        item.risk === 'high' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}>{item.risk}</Badge>
                      <span className="text-[10px] text-muted-foreground font-mono uppercase">{item.type}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground font-mono mt-1">&quot;{item.value}&quot;</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      via <span className="text-primary font-semibold">{item.platform}</span> · conf: <span className="text-primary font-bold">{item.conf}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ============ MODULE 3: IMAGE PREDICTION ============ */}
        <Card className="border-green-500/30 bg-background overflow-hidden">
          <CardHeader className="bg-green-500/5 border-b border-green-500/20">
            <CardTitle className="flex items-center gap-2 text-lg text-green-400">
              <ImageIcon className="w-5 h-5" />
              3. Image / Face Recognition
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Reverse image search across indexed web sources. 1 match found with high confidence.
            </p>

            <div className="border border-destructive/20 bg-destructive/5 rounded-lg p-3">
              <div className="flex items-center gap-2 text-destructive font-medium text-sm mb-1">
                <AlertTriangle className="h-4 w-4" />
                Privacy Alert
              </div>
              <p className="text-destructive/80 text-xs">Your face was found in 1 location(s) online.</p>
            </div>

            <div className="border border-border rounded-lg p-4 bg-muted/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-20 h-20 rounded-md bg-muted border border-border flex items-center justify-center shrink-0">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-foreground">Match 1</h4>
                    <Badge className="bg-destructive/20 text-destructive border-transparent text-xs font-bold">94.0%</Badge>
                  </div>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p>
                      <span className="font-bold uppercase text-[10px] tracking-wider">Found on:</span>{' '}
                      <span className="text-primary">https://www.newswire.lk/</span>
                    </p>
                    <p>
                      <span className="font-bold uppercase text-[10px] tracking-wider">Image URL:</span>{' '}
                      <span className="text-primary truncate">https://www.newswire.lk/wp-content/uploads/...</span>
                    </p>
                    <p className="text-[10px]">Scraped: {reportDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ============ MODULE 4: RISK SCORING ============ */}
        <Card className="border-orange-500/30 bg-background overflow-hidden">
          <CardHeader className="bg-orange-500/5 border-b border-orange-500/20">
            <CardTitle className="flex items-center gap-2 text-lg text-orange-400">
              <TrendingUp className="w-5 h-5" />
              4. Privacy Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="text-center py-4">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-400 font-semibold mb-2">Overall Risk Score</p>
              <p className="text-6xl font-black text-yellow-400">45</p>
              <p className="text-lg font-bold tracking-wider text-yellow-400 mt-1">MODERATE</p>
              <p className="text-xs text-muted-foreground max-w-md mx-auto mt-3 leading-relaxed">
                The subject has moderate privacy exposure. Impersonation indicators detected combined with publicly available PII across multiple platforms.
              </p>
            </div>

            <Separator />

            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Risk Factor Breakdown</h4>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-2 text-destructive"><AlertTriangle className="w-4 h-4" /> Data Breaches</span>
                  <span className="text-foreground font-mono">85 / 100</span>
                </div>
                <Progress value={85} className="h-2 bg-destructive/20 [&>div]:bg-destructive" />
                <p className="text-[10px] text-muted-foreground">Multiple critical breaches detected involving passwords.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-2 text-orange-500"><Crosshair className="w-4 h-4" /> Social Media Exposure</span>
                  <span className="text-foreground font-mono">60 / 100</span>
                </div>
                <Progress value={60} className="h-2 bg-orange-500/20 [&>div]:bg-orange-500" />
                <p className="text-[10px] text-muted-foreground">Public profiles found on Facebook, Instagram.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-2 text-green-500"><Activity className="w-4 h-4" /> Image Recognition</span>
                  <span className="text-foreground font-mono">15 / 100</span>
                </div>
                <Progress value={15} className="h-2 bg-green-500/20 [&>div]:bg-green-500" />
                <p className="text-[10px] text-muted-foreground">Low amount of un-indexed images found outside known networks.</p>
              </div>
            </div>

            {/* Legal Clauses */}
            <Separator />
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Applicable Legal Provisions (Sri Lanka)</h4>
            <div className="space-y-2">
              {[
                { code: 'OSA 18(a)', text: 'Online cheating by personation', score: 0.81 },
                { code: 'OSA 18(c)', text: 'Online cheating by personation', score: 0.81 },
                { code: 'OSA 18(b)', text: 'Online cheating by personation', score: 0.79 },
                { code: 'CCA 4(b)', text: 'Unauthorized access to information with intent', score: 0.78 },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between text-sm border border-border rounded-md p-2.5 bg-muted/20">
                  <span className="text-primary font-mono text-xs">• {c.code} — <span className="text-muted-foreground font-sans">{c.text}</span></span>
                  <span className="text-xs text-destructive font-mono font-bold">{c.score.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ============ RECOMMENDATIONS ============ */}
        <Card className="border-primary/30 bg-background overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/20">
            <CardTitle className="flex items-center gap-2 text-lg text-primary">
              <ShieldCheck className="w-5 h-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <ul className="space-y-3">
              {[
                'Immediately change passwords on all breached accounts (GlobalTicket, FitTracker)',
                'Enable Multi-Factor Authentication (MFA) on all email and social media accounts',
                'Review and restrict privacy settings on Facebook and Instagram profiles',
                'Remove publicly visible phone numbers and employment details from social media',
                'File a complaint with the Sri Lanka CERT regarding impersonation indicators',
                'Monitor your accounts regularly for unauthorized activity',
                'Consider filing a report under the Online Safety Act (OSA) if impersonation persists',
              ].map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ============ FOOTER ============ */}
        <div className="text-center space-y-2 pt-4 pb-8">
          <Separator className="max-w-xs mx-auto" />
          <p className="text-xs text-muted-foreground mt-4">
            This report was generated by <strong className="text-primary">FootprintLK</strong> — Digital Privacy Exposure Platform
          </p>
          <p className="text-[10px] text-muted-foreground">
            Report ID: FLK-{Date.now().toString(36).toUpperCase()} · Processing model: cyber-sentinel · Clauses: LK-§5
          </p>
          <p className="text-[10px] text-muted-foreground italic">
            Disclaimer: This report is based on publicly available data and mock analysis. Results should be verified independently.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
