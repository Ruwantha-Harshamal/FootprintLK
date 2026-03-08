export const siteConfig = {
  name: "FootprintLK",
  title: "FootprintLK - Privacy Exposure Detection Platform",
  description: "Discover your digital footprint across the internet. Detect data breaches, social media exposure, and image misuse.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  version: "1.0.0",
  
  // Feature flags
  features: {
    breachDetection: true,
    socialMedia: process.env.NEXT_PUBLIC_ENABLE_SOCIAL_MODULE === "true",
    imageSearch: process.env.NEXT_PUBLIC_ENABLE_IMAGE_SEARCH === "true",
    riskScoring: true,
  },
  
  // Module metadata
  modules: [
    {
      id: "breach-detection",
      name: "Data Breach Detection",
      description: "Check if your credentials have been exposed in data breaches",
      icon: "ShieldAlert",
      route: "/dashboard/breach-detection",
      enabled: true,
      color: "red",
    },
    {
      id: "social-media",
      name: "Social Media Exposure",
      description: "Discover your public information across social platforms",
      icon: "Users",
      route: "/dashboard/social-media",
      enabled: process.env.NEXT_PUBLIC_ENABLE_SOCIAL_MODULE === "true",
      color: "blue",
    },
    {
      id: "image-search",
      name: "Image Prediction",
      description: "Find where your images appear online",
      icon: "Image",
      route: "/dashboard/image-search",
      enabled: process.env.NEXT_PUBLIC_ENABLE_IMAGE_SEARCH === "true",
      color: "green",
    },
    {
      id: "risk-scoring",
      name: "Privacy Compliance Advisor",
      description: "AI-powered privacy compliance guidance and data exposure risk analysis",
      icon: "TrendingUp",
      route: "/dashboard/risk-scoring",
      enabled: true,
      color: "orange",
    },

  ] as const,
  
  // Links
  links: {
    github: "https://github.com/yourusername/footprintlk",
    docs: "/docs",
    support: "/support",
  },
} as const;

export type SiteConfig = typeof siteConfig;
