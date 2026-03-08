// Image Upload Hook
import { useState, useCallback } from 'react';
import { imageSearchApi } from '../services/imageSearchApi';
import type { SearchResult } from '../types';

interface UseImageUploadReturn {
  uploadImage: (file: File) => Promise<SearchResult | null>;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  resetUpload: () => void;
}

export function useImageUpload(): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File): Promise<SearchResult | null> => {
    // Validate file
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG)');
      return null;
    }

    if (file.size > maxSize) {
      setError('Image size must be less than 5MB');
      return null;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const result = await imageSearchApi.searchByImage(file, (progress) => {
        setUploadProgress(progress);
      });

      setUploadProgress(100);
      return result;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 
        err.message || 
        'Failed to upload image. Please try again.';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const resetUpload = useCallback(() => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
  }, []);

  return {
    uploadImage,
    isUploading,
    uploadProgress,
    error,
    resetUpload,
  };
}
