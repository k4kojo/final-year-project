import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ76slAFV1AAEymCrokEGMxB9u48w6Mxw",
  authDomain: "medi-connect-app-70848.firebaseapp.com",
  projectId: "medi-connect-app-70848",
  storageBucket: "medi-connect-app-70848.firebasestorage.app",
  messagingSenderId: "608389858171",
  appId: "1:608389858171:web:10c7af54ad1f5edb5e73de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistent storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Listen for auth state changes
const subscribeToAuth = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  subscribeToAuth,
};
