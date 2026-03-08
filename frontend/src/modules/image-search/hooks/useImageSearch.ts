// Image Search Hook
import { useState, useEffect, useCallback } from 'react';
import { imageSearchApi } from '../services/imageSearchApi';
import type { SearchResult, SearchHistory, ImageSearchFilters, ImageSearchStats } from '../types';

interface UseImageSearchReturn {
  searchHistory: SearchHistory | null;
  currentResult: SearchResult | null;
  stats: ImageSearchStats | null;
  isLoading: boolean;
  error: string | null;
  fetchHistory: (filters?: ImageSearchFilters) => Promise<void>;
  fetchResult: (searchId: string) => Promise<void>;
  fetchStats: () => Promise<void>;
  deleteResult: (searchId: string) => Promise<void>;
  setCurrentResult: (result: SearchResult | null) => void;
}

export function useImageSearch(): UseImageSearchReturn {
  const [searchHistory, setSearchHistory] = useState<SearchHistory | null>(null);
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [stats, setStats] = useState<ImageSearchStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async (filters?: ImageSearchFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const history = await imageSearchApi.getSearchHistory(filters);
      setSearchHistory(history);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch search history';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchResult = useCallback(async (searchId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await imageSearchApi.getSearchResult(searchId);
      setCurrentResult(result);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch search result';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const statistics = await imageSearchApi.getSearchStats();
      setStats(statistics);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch statistics';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteResult = useCallback(async (searchId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await imageSearchApi.deleteSearchResult(searchId);
      // Refresh history after deletion
      await fetchHistory();
      if (currentResult?.id === searchId) {
        setCurrentResult(null);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete search result';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [fetchHistory, currentResult]);

  return {
    searchHistory,
    currentResult,
    stats,
    isLoading,
    error,
    fetchHistory,
    fetchResult,
    fetchStats,
    deleteResult,
    setCurrentResult,
  };
}
