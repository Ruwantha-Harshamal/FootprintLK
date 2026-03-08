"use client";

import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { SocialMediaDashboard } from '@/modules/social-media/components/SocialMediaDashboard';
import { ShieldAlert } from 'lucide-react';

export default function SocialMediaPage() {
  return (
    <DashboardLayout>
      <div className="-mx-6 -mt-6 bg-card border-b border-border pb-32 pt-16 px-6 text-center text-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
          <ShieldAlert className="h-10 w-10 md:h-12 md:w-12 text-primary drop-shadow-md" />
          Digital Footprint Analysis
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 font-light">
          Enter a name or username to search across platforms
        </p>
      </div>

      <div className="max-w-5xl mx-auto -mt-16 relative z-10 space-y-6">
        <SocialMediaDashboard />
      </div>
    </DashboardLayout>
  );
}
