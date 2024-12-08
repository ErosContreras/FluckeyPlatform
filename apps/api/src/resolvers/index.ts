import { auth, firestore } from '../config/firebase';
import { verifyAndDecodeToken } from '../utils/auth';
import { User, PortfolioItem } from '@creative-network/shared/src/types/user';

export const resolvers = {
  Query: {
    me: async (_, __, { auth }) => {
      if (!auth?.uid) throw new Error('Not authenticated');
      const userDoc = await firestore.collection('users').doc(auth.uid).get();
      return { id: userDoc.id, ...userDoc.data() };
    },

    user: async (_, { id }) => {
      const userDoc = await firestore.collection('users').doc(id).get();
      if (!userDoc.exists) throw new Error('User not found');
      return { id: userDoc.id, ...userDoc.data() };
    },

    searchUsers: async (_, { query, limit }) => {
      const usersRef = firestore.collection('users');
      const snapshot = await usersRef
        .where('displayName', '>=', query)
        .where('displayName', '<=', query + '\uf8ff')
        .limit(limit)
        .get();
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    portfolioItems: async (_, { userId }) => {
      const itemsRef = firestore.collection('users').doc(userId).collection('portfolioItems');
      const snapshot = await itemsRef.orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      const { email, password, displayName, profession, skills } = input;
      
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
      });

      const userData = {
        email,
        displayName,
        profession,
        skills,
        connections: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await firestore.collection('users').doc(userRecord.uid).set(userData);
      
      const token = await auth.createCustomToken(userRecord.uid);
      return {
        token,
        user: { id: userRecord.uid, ...userData },
      };
    },

    login: async (_, { email, password }) => {
      // Note: In a real implementation, you'd use Firebase Auth REST API
      // This is a simplified version
      const userRecord = await auth.getUserByEmail(email);
      const token = await auth.createCustomToken(userRecord.uid);
      
      const userDoc = await firestore.collection('users').doc(userRecord.uid).get();
      return {
        token,
        user: { id: userRecord.uid, ...userDoc.data() },
      };
    },

    updateProfile: async (_, { input }, { auth }) => {
      if (!auth?.uid) throw new Error('Not authenticated');
      
      const userRef = firestore.collection('users').doc(auth.uid);
      await userRef.update({
        ...input,
        updatedAt: new Date().toISOString(),
      });

      const updated = await userRef.get();
      return { id: updated.id, ...updated.data() };
    },
  },
};