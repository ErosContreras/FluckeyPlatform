import { FIREBASE_CONFIG } from './firebase-config';

export const getFirebaseConfig = (platform: 'web' | 'mobile') => {
  return FIREBASE_CONFIG;
};

export const FIREBASE_STORAGE_PATHS = {
  PROFILE_IMAGES: 'profile-images',
  PORTFOLIO_ITEMS: 'portfolio-items',
} as const;

export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  PORTFOLIO_ITEMS: 'portfolioItems',
  USER_SETTINGS: 'userSettings',
} as const;