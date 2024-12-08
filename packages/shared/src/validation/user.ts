import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  profession: z.array(z.string()),
  skills: z.array(z.string()),
  profileImage: z.string().url().optional(),
});

export const portfolioItemSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000),
  mediaUrls: z.array(z.string().url()),
  category: z.string(),
  tags: z.array(z.string()),
});