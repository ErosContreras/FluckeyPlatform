import { auth } from '../config/firebase';

export const verifyAndDecodeToken = async (token: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const extractTokenFromHeader = (header: string) => {
  if (!header || !header.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  return header.split('Bearer ')[1];
};