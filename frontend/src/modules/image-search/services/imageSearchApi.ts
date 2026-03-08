// Image Search API Service
import { apiClient } from '@/shared/services/api';
import type { SearchResult, SearchHistory, ImageSearchFilters, ImageSearchStats } from '../types';

export const imageSearchApi = {
  /**
   * Upload image and perform face recognition search
   */
  searchByImage: async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<SearchResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post(
      '/api/search',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      }
    );

    return response.data as SearchResult;
  },

  /**
   * Get search history for the current user
   */
  getSearchHistory: async (filters?: ImageSearchFilters): Promise<SearchHistory> => {
    const response = await apiClient.get('/api/history', {
      params: filters,
    });
    return response.data as SearchHistory;
  },

  /**
   * Get specific search result by ID
   */
  getSearchResult: async (searchId: string): Promise<SearchResult> => {
    const response = await apiClient.get(`/api/result/${searchId}`);
    return response.data as SearchResult;
  },

  /**
   * Delete a search result
   */
  deleteSearchResult: async (searchId: string): Promise<void> => {
    await apiClient.delete(`/api/result/${searchId}`);
  },

  /**
   * Get search statistics
   */
  getSearchStats: async (): Promise<ImageSearchStats> => {
    const response = await apiClient.get('/api/search/stats');
    return response.data as ImageSearchStats;
  },

  /**
   * Get comparison between two images
   */
  compareImages: async (
    searchId: string,
    matchId: string
  ): Promise<{
    similarity: number;
    uploadedImageUrl: string;
    matchedImageUrl: string;
  }> => {
    const response = await apiClient.get(`/api/search/${searchId}/compare/${matchId}`);
    return response.data;
  },
};
