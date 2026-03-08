"use client";

import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { TrendingUp, Activity, Crosshair, AlertOctagon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function RiskScoringPage() {
  return (
    <DashboardLayout>
      <div className="-mx-3 md:-mx-6 -mt-3 md:-mt-6 bg-card border-b border-border pb-24 pt-12 md:pt-16 px-3 md:px-6 text-center text-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4 text-orange-500">
          <TrendingUp className="h-10 w-10 md:h-12 md:w-12 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]" />
          Privacy Compliance Advisor
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 font-light max-w-2xl mx-auto">
          AI-powered privacy compliance guidance — Sri Lankan data exposure risk analysis & legal advisory.
        </p>
      </div>

      <div className="max-w-5xl mx-auto -mt-12 relative z-10 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
        {/* Main Score Card */}
        <Card className="md:col-span-1 border-orange-500/30 overflow-hidden relative bg-background shadow-[0_4px_30px_rgba(255,165,0,0.05)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16" />
          <CardHeader>
            <CardTitle className="text-orange-500 uppercase tracking-wider text-sm">Overall Risk Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-4 border-muted">
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="74"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-orange-500 drop-shadow-[0_0_8px_rgba(255,165,0,0.8)]"
                  strokeDasharray="465"
                  strokeDashoffset="140" /* 70% of 465 roughly */
                />
              </svg>
              <div className="text-center">
                <span className="text-5xl font-bold text-foreground drop-shadow-md">70</span>
                <span className="text-xl text-muted-foreground block">/100</span>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-orange-500">ELEVATED RISK</h3>
          </CardContent>
          <CardFooter className="bg-orange-500/10 border-t border-orange-500/20 px-6 py-4">
            <p className="text-xs text-muted-foreground text-center w-full">
              Your data is somewhat exposed. Action is recommended to reduce your score.
            </p>
          </CardFooter>
        </Card>

        {/* Contributing Factors */}
        <Card className="md:col-span-2 border-border bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-foreground">
              <Activity className="h-5 w-5 text-primary" />
              Risk Factors Breakdown
            </CardTitle>
            <CardDescription>How your overall score is calculated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="flex items-center gap-2 text-destructive"><AlertOctagon className="w-4 h-4"/> Data Breaches</span>
                <span className="text-foreground font-mono">85 / 100</span>
              </div>
              <Progress value={85} className="h-2 bg-destructive/20 [&>div]:bg-destructive" />
              <p className="text-xs text-muted-foreground">Multiple critical breaches detected involving passwords.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="flex items-center gap-2 text-orange-500"><Crosshair className="w-4 h-4"/> Social Media Exposure</span>
                <span className="text-foreground font-mono">60 / 100</span>
              </div>
              <Progress value={60} className="h-2 bg-orange-500/20 [&>div]:bg-orange-500" />
              <p className="text-xs text-muted-foreground">Public profiles found on Facebook, Instagram, LinkedIn.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="flex items-center gap-2 text-green-500"><Activity className="w-4 h-4"/> Image Recognition Matches</span>
                <span className="text-foreground font-mono">15 / 100</span>
              </div>
              <Progress value={15} className="h-2 bg-green-500/20 [&>div]:bg-green-500" />
              <p className="text-xs text-muted-foreground">Low amount of un-indexed images found outside known networks.</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
