// Similarity Card Component
"use client";

import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { FaceMatch } from '../types';

interface SimilarityCardProps {
  match: FaceMatch;
  onCompare?: () => void;
}

export function SimilarityCard({ match, onCompare }: SimilarityCardProps) {
  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 90) return 'text-red-500';
    if (similarity >= 75) return 'text-orange-500';
    if (similarity >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getSimilarityBadge = (similarity: number) => {
    if (similarity >= 90)
      return <Badge variant="destructive">Very High Match</Badge>;
    if (similarity >= 75)
      return <Badge className="bg-orange-600">High Match</Badge>;
    if (similarity >= 60)
      return <Badge className="bg-yellow-600">Medium Match</Badge>;
    return <Badge variant="secondary">Low Match</Badge>;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative h-48 bg-muted">
          <img
            src={match.imageUrl}
            alt="Matched face"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            {getSimilarityBadge(match.similarity)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Similarity Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Similarity</span>
              <span className={`text-lg font-bold ${getSimilarityColor(match.similarity)}`}>
                {match.similarity.toFixed(1)}%
              </span>
            </div>
            <Progress value={match.similarity} className="h-2" />
          </div>

          {/* Website Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{match.websiteName}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Detected {new Date(match.detectedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onCompare}
            >
              Compare
            </Button>
            <Button
              variant="default"
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={match.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View Source
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
