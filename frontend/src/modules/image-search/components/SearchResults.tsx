// Search Results Component
"use client";

import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SimilarityCard } from './SimilarityCard';
import type { SearchResult } from '../types';

interface SearchResultsProps {
  result: SearchResult;
  onCompare?: (matchId: string) => void;
}

export function SearchResults({ result, onCompare }: SearchResultsProps) {
  const [minSimilarity, setMinSimilarity] = useState(0);
  const [sortBy, setSortBy] = useState<'similarity' | 'date'>('similarity');

  const filteredMatches = result.matches
    .filter((match) => match.similarity >= minSimilarity)
    .sort((a, b) => {
      if (sortBy === 'similarity') {
        return b.similarity - a.similarity;
      }
      return new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime();
    });

  const getStatusAlert = () => {
    if (result.status === 'processing') {
      return (
        <Alert>
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>
            Processing your image... This may take a few moments.
          </AlertDescription>
        </Alert>
      );
    }

    if (result.status === 'failed') {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {result.errorMessage || 'Failed to process image. Please try again.'}
          </AlertDescription>
        </Alert>
      );
    }

    if (result.totalMatches === 0) {
      return (
        <Alert>
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>
            No matches found! Your image doesn't appear to be publicly available online.
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {getStatusAlert()}

      {/* Results Summary */}
      {result.status === 'completed' && result.totalMatches > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results</span>
              <Badge variant="outline" className="text-lg">
                {result.totalMatches} {result.totalMatches === 1 ? 'Match' : 'Matches'} Found
              </Badge>
            </CardTitle>
            <CardDescription>
              Found {result.facesDetected} face(s) in your image. Processing completed in {(result.processingTime / 1000).toFixed(2)}s.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-muted rounded-lg">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Min Similarity:</span>
                <div className="flex gap-2">
                  {[0, 50, 70, 90].map((value) => (
                    <Button
                      key={value}
                      size="sm"
                      variant={minSimilarity === value ? 'default' : 'outline'}
                      onClick={() => setMinSimilarity(value)}
                    >
                      {value}%+
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium">Sort by:</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={sortBy === 'similarity' ? 'default' : 'outline'}
                    onClick={() => setSortBy('similarity')}
                  >
                    Similarity
                  </Button>
                  <Button
                    size="sm"
                    variant={sortBy === 'date' ? 'default' : 'outline'}
                    onClick={() => setSortBy('date')}
                  >
                    Date
                  </Button>
                </div>
              </div>
            </div>

            {/* Matches Grid */}
            {filteredMatches.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No matches found with the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMatches.map((match) => (
                  <SimilarityCard
                    key={match.id}
                    match={match}
                    onCompare={() => onCompare?.(match.id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
