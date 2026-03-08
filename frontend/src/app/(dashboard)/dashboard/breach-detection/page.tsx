"use client";

import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, AlertTriangle, ShieldCheck, Database, Key } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BreachDetectionPage() {
  return (
    <DashboardLayout>
      <div className="-mx-3 md:-mx-6 -mt-3 md:-mt-6 bg-card border-b border-border pb-24 pt-12 md:pt-16 px-3 md:px-6 text-center text-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4 text-destructive">
          <ShieldAlert className="h-10 w-10 md:h-12 md:w-12 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
          Data Breach Detection
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 font-light max-w-2xl mx-auto">
          Scan the dark web and known data dumps to see if your accounts, passwords, or personal details have been compromised.
        </p>
      </div>

      <div className="max-w-4xl mx-auto -mt-12 relative z-10 space-y-4 md:space-y-6">
        <Card className="border-destructive/30 shadow-[0_4px_30px_rgba(255,0,0,0.05)] bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-destructive">
              <AlertTriangle className="h-6 w-6" />
              Recent Breaches Found
            </CardTitle>
            <CardDescription>We've detected your information in the following known breaches.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mock Breach 1 */}
            <div className="flex flex-col md:flex-row gap-4 p-4 border border-destructive/20 bg-destructive/5 rounded-lg items-start md:items-center">
              <div className="bg-destructive/20 p-3 rounded-md">
                <Database className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">GlobalTicket Network</h3>
                <p className="text-sm text-muted-foreground">Compromised on: Oct 24, 2024</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="border-destructive/50 text-destructive">Email Addresses</Badge>
                  <Badge variant="outline" className="border-destructive/50 text-destructive">Passwords</Badge>
                </div>
              </div>
              <Badge className="bg-destructive hover:bg-destructive/90">Critical</Badge>
            </div>

            {/* Mock Breach 2 */}
            <div className="flex flex-col md:flex-row gap-4 p-4 border border-orange-500/20 bg-orange-500/5 rounded-lg items-start md:items-center">
              <div className="bg-orange-500/20 p-3 rounded-md">
                <Key className="h-6 w-6 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">FitTracker App</h3>
                <p className="text-sm text-muted-foreground">Compromised on: Jan 12, 2023</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="border-orange-500/50 text-orange-500">Email Addresses</Badge>
                  <Badge variant="outline" className="border-orange-500/50 text-orange-500">Names</Badge>
                </div>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600">Elevated</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-green-500">
              <ShieldCheck className="h-6 w-6" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Change your password on GlobalTicket Network immediately.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Ensure you are not using the breached password on any other important accounts.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Enable Multi-Factor Authentication (MFA) on your email provider.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
