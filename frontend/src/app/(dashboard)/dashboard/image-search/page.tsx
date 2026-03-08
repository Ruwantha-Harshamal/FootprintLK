"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Camera, AlertTriangle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function ImageSearchPage() {
  const [status, setStatus] = useState<'idle' | 'results'>('idle');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setStatus('results');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStatus('results');
    }
  };

  return (
    <DashboardLayout>
      <div className="-mx-6 -mt-6 bg-card border-b border-border pb-32 pt-16 px-6 text-center text-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
          <Search className="h-10 w-10 md:h-12 md:w-12 text-primary drop-shadow-md" style={{ transform: 'rotate(-45deg)' }} />
          Check Your Privacy Exposure
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 font-light">
          Discover if your face has been exposed online without your knowledge
        </p>
        <p className="text-sm text-primary/60 font-medium tracking-widest uppercase">
          0 faces indexed from 0 websites
        </p>
      </div>

      <div className="max-w-3xl mx-auto -mt-16 relative z-10 space-y-6">
        <Card className="shadow-2xl border border-border bg-card overflow-hidden mb-12">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-medium text-foreground text-center mb-8">Upload Your Photo</h2>

            {status === 'idle' ? (
              <div 
                className={cn(
                  "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-all duration-300 mb-8",
                  isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="bg-muted border border-border rounded-lg p-4 mb-6 shadow-sm">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-foreground">Drag & Drop Your Photo Here</h3>
                <p className="text-muted-foreground mb-6 text-sm">or click to browse</p>
                <label>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-medium shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                    <span>Choose Photo</span>
                  </Button>
                  <input type="file" className="hidden" onChange={handleFileSelect} accept="image/*" />
                </label>
              </div>
            ) : (
              <div className="space-y-6 mb-8">
                <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-destructive font-medium mb-1 text-lg">
                    <AlertTriangle className="h-5 w-5 text-destructive fill-destructive/20" />
                    Privacy Alert
                  </div>
                  <p className="text-destructive/80 text-sm">Your face was found in 1 location(s).</p>
                </div>

                <div className="border border-border rounded-md border-l-4 border-l-destructive bg-muted/30 p-5 flex gap-6 shadow-sm hover:border-r-primary transition-all">
                  <div className="w-24 h-24 rounded-md overflow-hidden bg-background border border-border flex-shrink-0">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg" 
                      alt="Match" 
                      className="w-full h-full object-cover opacity-90" 
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-foreground">Match 1</h3>
                      <Badge className="bg-destructive/20 text-destructive border-transparent text-sm px-2.5 py-0.5 rounded-sm shadow-sm font-bold">
                        94.0%
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-foreground pt-1">
                      <p>
                        <span className="font-bold text-muted-foreground uppercase text-xs tracking-wider">Found on:</span> <a href="#" className="text-primary hover:text-primary/80 hover:underline">https://www.newswire.lk/</a>
                      </p>
                      <p className="flex w-full">
                        <span className="font-bold text-muted-foreground uppercase text-xs tracking-wider mr-1 whitespace-nowrap">Image URL:</span> 
                        <a href="#" className="text-primary hover:text-primary/80 hover:underline truncate">https://www.newswire.lk/wp-content/upl...</a>
                      </p>
                      <p className="text-muted-foreground text-xs pt-1">
                        Scraped: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium py-6 shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
                  onClick={() => setStatus('idle')}
                >
                  Check Another Photo
                </Button>
              </div>
            )}

            <div className="bg-primary/5 border border-primary/20 rounded-md p-5 shadow-sm">
              <h4 className="flex items-center gap-2 font-medium text-primary mb-3 text-sm tracking-wide">
                <Lock className="h-4 w-4 text-primary" />
                YOUR PRIVACY IS PROTECTED
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside ml-1">
                <li>Your photo is processed locally and deleted immediately after search</li>
                <li>We don't store any user photos or personal information</li>
                <li>No tracking or analytics algorithms active</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
