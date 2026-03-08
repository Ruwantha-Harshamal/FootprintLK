// Image Search Module Types

export interface FaceMatch {
  id: string;
  similarity: number; // 0-100
  confidence: number;
  imageUrl: string;
  sourceUrl: string;
  websiteName: string;
  detectedAt: string;
  metadata?: {
    faceLocation?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    embeddings?: number[];
  };
}

export interface SearchResult {
  id: string;
  uploadedImage: string;
  uploadedAt: string;
  facesDetected: number;
  matches: FaceMatch[];
  totalMatches: number;
  processingTime: number; // in milliseconds
  status: 'processing' | 'completed' | 'failed';
  errorMessage?: string;
}

export interface SearchHistory {
  searches: SearchResult[];
  totalSearches: number;
  lastSearchAt?: string;
}

export interface ImageUploadOptions {
  file: File;
  onProgress?: (progress: number) => void;
  onSuccess?: (result: SearchResult) => void;
  onError?: (error: Error) => void;
}

export interface ImageSearchFilters {
  minSimilarity?: number; // 0-100
  dateFrom?: string;
  dateTo?: string;
  websites?: string[];
  limit?: number;
}

export interface ImageSearchStats {
  totalSearches: number;
  totalMatches: number;
  averageSimilarity: number;
  mostSearchedDate: string;
  uniqueWebsites: number;
}
