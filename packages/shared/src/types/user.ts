export interface User {
  id: string;
  email: string;
  displayName: string;
  profileImage?: string;
  bio?: string;
  profession: string[];
  skills: string[];
  portfolioItems: PortfolioItem[];
  connections: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  mediaUrls: string[];
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  profileVisibility: 'public' | 'connections' | 'private';
  theme: 'light' | 'dark' | 'system';
}