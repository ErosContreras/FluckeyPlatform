export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
export const MAX_PORTFOLIO_ITEMS = 20;
export const MAX_CONNECTIONS = 5000;

export const PROFESSIONS = [
  'Photographer',
  'Designer',
  'Illustrator',
  'Videographer',
  'Writer',
  'Artist',
  'Developer',
  'Musician',
  'Other'
] as const;

export const PORTFOLIO_CATEGORIES = [
  'Photography',
  'Design',
  'Illustration',
  'Video',
  'Writing',
  'Art',
  'Development',
  'Music',
  'Other'
] as const;