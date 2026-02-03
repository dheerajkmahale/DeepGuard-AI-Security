/**
 * Site Configuration
 * Central configuration for URLs, metadata, and site-wide settings
 */

export const siteConfig = {
  name: "DeepGuard AI",
  url: "https://deepguardai.com",
  description: "Real-time AI-powered deepfake detection platform. Detect manipulated videos and audio to combat misinformation.",
  
  social: {
    twitter: "@DeepGuardAI",
    github: "https://github.com/deepguardai",
  },
  
  contact: {
    email: "contact@deepguardai.com",
    support: "support@deepguardai.com",
  },
  
  api: {
    baseUrl: process.env.NODE_ENV === "production" 
      ? "https://api.deepguardai.com" 
      : "http://localhost:3000",
  },
  
  features: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    supportedImageFormats: [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff"],
    supportedVideoFormats: [".mp4", ".avi", ".mkv", ".mov", ".webm"],
    supportedAudioFormats: [".mp3", ".wav", ".m4a", ".ogg"],
    detectionAccuracy: 99.4,
  },
} as const;

export type SiteConfig = typeof siteConfig;
