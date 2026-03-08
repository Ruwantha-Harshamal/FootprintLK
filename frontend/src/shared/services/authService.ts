import { apiClient } from './api';
import { apiConfig } from '@/config/api.config';
import type { User, AuthResponse, LoginCredentials, RegisterData } from '@/shared/types/auth';

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      apiConfig.endpoints.auth.login,
      credentials
    );
    
    // Store token and user data
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },
  
  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      apiConfig.endpoints.auth.register,
      data
    );
    
    // Store token and user data
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },
  
  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post(apiConfig.endpoints.auth.logout);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },
  
  // Get current user
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(apiConfig.endpoints.auth.me);
  },
  
  // Refresh token
  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      apiConfig.endpoints.auth.refresh
    );
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },
  
  // Get stored user data
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
