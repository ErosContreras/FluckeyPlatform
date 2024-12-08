import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyAndDecodeToken, extractTokenFromHeader } from '../utils/auth';

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      request.user = null;
      return;
    }

    const token = extractTokenFromHeader(authHeader);
    const decodedToken = await verifyAndDecodeToken(token);
    request.user = decodedToken;
  } catch (error) {
    request.user = null;
  }
};