// Image Uploader Component with Drag & Drop
"use client";

import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  error?: string | null;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
}

export function ImageUploader({
  onUpload,
  isUploading = false,
  uploadProgress = 0,
  error = null,
  maxSize = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/jpg'],
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file && acceptedFormats.includes(file.type)) {
        handleFileSelect(file);
      }
    },
    [acceptedFormats]
  );

  const handleFileSelect = (file: File) => {
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  return (
    <Card>
      <CardContent className="p-6">
        {!previewUrl ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 transition-all cursor-pointer',
              isDragging
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg font-medium mb-2">
              {isDragging ? 'Drop your image here' : 'Drag and drop your image here'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <label htmlFor="file-upload">
              <Button type="button" disabled={isUploading} asChild>
                <span>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Select Image
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept={acceptedFormats.join(',')}
              onChange={handleFileInput}
              className="hidden"
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: {acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} (max {maxSize}MB)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="relative rounded-lg overflow-hidden border">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
              {!isUploading && (
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* File Info */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {selectedFile?.name} ({(selectedFile!.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-center text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Upload Button */}
            {!isUploading && (
              <Button
                onClick={handleUploadClick}
                className="w-full"
                size="lg"
              >
                <Upload className="mr-2 h-4 w-4" />
                Search for Similar Images
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
