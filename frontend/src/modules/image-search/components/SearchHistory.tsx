// Search History Component
"use client";

import { History, Trash2, Eye, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { SearchHistory } from '../types';

interface SearchHistoryProps {
  history: SearchHistory;
  onView: (searchId: string) => void;
  onDelete: (searchId: string) => void;
  isLoading?: boolean;
}

export function SearchHistory({
  history,
  onView,
  onDelete,
  isLoading = false,
}: SearchHistoryProps) {
  if (history.searches.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <History className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">No search history</p>
          <p className="text-sm text-muted-foreground">
            Your search history will appear here after you upload an image.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Search History
        </CardTitle>
        <CardDescription>
          Total searches: {history.totalSearches}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.searches.map((search) => (
            <div
              key={search.id}
              className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={search.uploadedImage}
                  alt="Search thumbnail"
                  className="w-full h-full object-cover"
                />
                {search.totalMatches > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center text-xs"
                    variant="destructive"
                  >
                    {search.totalMatches}
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
                    {search.totalMatches} {search.totalMatches === 1 ? 'match' : 'matches'} found
                  </span>
                  {search.status === 'processing' && (
                    <Badge variant="secondary">Processing</Badge>
                  )}
                  {search.status === 'failed' && (
                    <Badge variant="destructive">Failed</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(search.uploadedAt).toLocaleString()}</span>
                  <span>•</span>
                  <span>{search.facesDetected} face(s) detected</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onView(search.id)}
                  disabled={isLoading}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(search.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
