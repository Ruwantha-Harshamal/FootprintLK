// Image Search Module - Component Exports

export { ImageUploader } from './components/ImageUploader';
export { SearchResults } from './components/SearchResults';
export { SimilarityCard } from './components/SimilarityCard';
export { SearchHistory } from './components/SearchHistory';
export { ImagePreview } from './components/ImagePreview';

export { useImageUpload } from './hooks/useImageUpload';
export { useImageSearch } from './hooks/useImageSearch';

export { imageSearchApi } from './services/imageSearchApi';

export type {
  FaceMatch,
  SearchResult,
  SearchHistory as SearchHistoryType,
  ImageUploadOptions,
  ImageSearchFilters,
  ImageSearchStats,
} from './types';
