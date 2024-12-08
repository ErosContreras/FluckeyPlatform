import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mercurius from 'mercurius';
import { schema } from './schema';
import { resolvers } from './resolvers';
import { initializeFirebase } from './config/firebase';
import { authMiddleware } from './middleware/auth';

const fastify = Fastify({
  logger: true,
});

// Initialize Firebase Admin
initializeFirebase();

// Register plugins
fastify.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      process.env.WEB_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:3001',
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
      return;
    }
    cb(new Error('Not allowed'), false);
  },
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key',
});

// Register auth middleware
fastify.addHook('preHandler', authMiddleware);

// Register GraphQL endpoint
fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
  context: (request) => {
    return {
      auth: request.user,
    };
  },
});

// Health check endpoint
fastify.get('/health', async () => {
  return { status: 'ok' };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:4000');
    console.log('GraphQL Playground available at http://localhost:4000/graphiql');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();