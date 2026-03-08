// Image Preview Component
"use client";

import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ImagePreviewProps {
  imageUrl: string;
  title?: string;
  facesDetected?: number;
  uploadedAt?: string;
  onClose?: () => void;
}

export function ImagePreview({
  imageUrl,
  title = 'Uploaded Image',
  facesDetected,
  uploadedAt,
  onClose,
}: ImagePreviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        {onClose && (
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image */}
        <div className="relative rounded-lg overflow-hidden border">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-auto max-h-96 object-contain bg-muted"
          />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm">
          {facesDetected !== undefined && (
            <Badge variant="secondary">
              {facesDetected} {facesDetected === 1 ? 'face' : 'faces'} detected
            </Badge>
          )}
          {uploadedAt && (
            <span className="text-muted-foreground">
              Uploaded {new Date(uploadedAt).toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
