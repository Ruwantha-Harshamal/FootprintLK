"use client";

import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Users, 
  Image as ImageIcon, 
  ArrowRight,
  Activity,
  ShieldAlert,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to FootprintLK - Your Privacy Exposure Detection Platform
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Social Profiles
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Image Matches
              </CardTitle>
              <ImageIcon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Upload an image to search
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Modules Grid */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground uppercase tracking-widest">Privacy Scan Modules</h2>
          <div className="grid gap-4 md:grid-cols-2">

            {/* Module 1: Data Breach - ACTIVE */}
            <Card className="relative overflow-hidden border-destructive/50 bg-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full -mr-16 -mt-16" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <ShieldAlert className="h-8 w-8 text-destructive" />
                  <Badge className="bg-destructive hover:bg-destructive/80 text-destructive-foreground">Active</Badge>
                </div>
                <CardTitle className="text-foreground tracking-wide uppercase mt-2">Data Breach Detection</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Check if your email, phone, or passwords have been exposed in data breaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-destructive/90 hover:bg-destructive text-destructive-foreground shadow-[0_0_15px_rgba(255,0,0,0.2)] tracking-widest uppercase">
                  <Link href="/dashboard/breach-detection">
                    Start Breach Scan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Module 2: Social Media - ACTIVE */}
            <Card className="relative overflow-hidden border-blue-500/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Users className="h-8 w-8 text-blue-500" />
                  <Badge className="bg-blue-500">Active</Badge>
                </div>
                <CardTitle>Social Media Exposure</CardTitle>
                <CardDescription>
                  Discover what personal information is publicly visible across social platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/dashboard/social-media">
                    Scan Social Media
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Module 3: Image Search - ACTIVE */}
            <Card className="relative overflow-hidden border-green-500/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <ImageIcon className="h-8 w-8 text-green-500" />
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <CardTitle>Image Prediction</CardTitle>
                <CardDescription>
                  Find where your images appear online using advanced face recognition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/dashboard/image-search">
                    Search Images
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Module 4: Risk Scoring - ACTIVE */}
            <Card className="relative overflow-hidden border-orange-500/50 bg-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                  <Badge className="bg-orange-500 hover:bg-orange-600">Active</Badge>
                </div>
                <CardTitle className="text-foreground tracking-wide uppercase mt-2">Risk Scoring</CardTitle>
                <CardDescription className="text-muted-foreground">
                  View your overall privacy exposure risk score and get actionable recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-[0_0_15px_rgba(255,165,0,0.2)] tracking-widest uppercase">
                  <Link href="/dashboard/risk-scoring">
                    View Risk Score
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
        
        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Follow these steps to protect your digital privacy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div>
                <h4 className="font-semibold">Upload Your Image</h4>
                <p className="text-sm text-muted-foreground">
                  Start with the Image Prediction module to see where your photos appear online
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Scan Social Media</h4>
                <p className="text-sm text-muted-foreground">
                  Use the Social Media Exposure module to assess your public digital footprint
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
