import { useAuthStore } from '@/shared/store/authStore';
import { authService } from '@/shared/services/authService';
import { useRouter } from 'next/navigation';
import type { LoginCredentials, RegisterData } from '@/shared/types/auth';

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, login: setAuthState, logout: clearAuthState, setLoading } = useAuthStore();
  
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      setAuthState(response.user, response.token);
      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      const response = await authService.register(data);
      setAuthState(response.user, response.token);
      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuthState();
      router.push('/login');
    }
  };
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
}
