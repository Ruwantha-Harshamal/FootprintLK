export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  adminBaseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:5001",
  timeout: 30000,
  
  endpoints: {
    // Auth endpoints
    auth: {
      login: "/api/auth/login",
      register: "/api/auth/register",
      logout: "/api/auth/logout",
      refresh: "/api/auth/refresh",
      me: "/api/auth/me",
    },
    
    // Image Search endpoints
    imageSearch: {
      upload: "/api/search",
      history: "/api/history",
      result: (id: string) => `/api/result/${id}`,
      delete: (id: string) => `/api/result/${id}`,
      stats: "/api/stats",
    },
    
    // Breach Detection endpoints (future)
    breach: {
      search: "/api/breach/search",
      history: "/api/breach/history",
    },
    
    // Social Media endpoints (future)
    social: {
      scan: "/api/social/scan",
      profiles: "/api/social/profiles",
    },
    
    // Risk Scoring endpoints (future)
    risk: {
      calculate: "/api/risk/calculate",
      history: "/api/risk/history",
    },
  },
} as const;

export type ApiConfig = typeof apiConfig;
