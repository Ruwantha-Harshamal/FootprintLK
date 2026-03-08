// Common API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Module navigation types
export interface ModuleRoute {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  enabled: boolean;
  color: 'red' | 'blue' | 'green' | 'purple';
}
