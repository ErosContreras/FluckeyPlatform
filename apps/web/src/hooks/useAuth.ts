import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User } from '@shared/types/user';
import { userSchema } from '@shared/validation/user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ id: userDoc.id, ...userDoc.data() } as User);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (userDoc.exists()) {
        setUser({ id: userDoc.id, ...userDoc.data() } as User);
      }
    } catch (err) {
      setError('Invalid email or password');
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // Create new user profile if it doesn't exist
        const newUser: Omit<User, 'id'> = {
          email: result.user.email!,
          displayName: result.user.displayName || 'User',
          profession: [],
          skills: [],
          portfolioItems: [],
          connections: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        await setDoc(doc(db, 'users', result.user.uid), newUser);
        setUser({ id: result.user.uid, ...newUser });
      } else {
        setUser({ id: userDoc.id, ...userDoc.data() } as User);
      }
    } catch (err) {
      setError('Failed to sign in with Google');
      throw err;
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    displayName: string;
    profession: string[];
    skills: string[];
  }) => {
    try {
      setError(null);
      const { email, password, ...profile } = userData;
      const validatedData = userSchema.parse(profile);
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUser: Omit<User, 'id'> = {
        ...validatedData,
        email,
        portfolioItems: [],
        connections: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', result.user.uid), newUser);
      setUser({ id: result.user.uid, ...newUser });
    } catch (err) {
      setError('Failed to create account');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err) {
      setError('Failed to sign out');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
  };
};