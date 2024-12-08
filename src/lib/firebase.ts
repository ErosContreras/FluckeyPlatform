import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBTLvnp6L6m1x5dLJ1OdWfwnsgNN1_53ZE",
  authDomain: "fluckeyplatform.firebaseapp.com",
  projectId: "fluckeyplatform",
  storageBucket: "fluckeyplatform.firebasestorage.app",
  messagingSenderId: "76928364407",
  appId: "1:76928364407:web:12b5893ef0d77aefa37b72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);