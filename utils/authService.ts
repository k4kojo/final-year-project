import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

// Sign up user and store in Firestore
export const signUpUser = async ({
  fullName,
  email,
  password,
  phoneNumber,
  dateOfBirth,
}: {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
}) => {
  try {
    // Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      createdAt: Timestamp.now(),
    });

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Sign in user and fetch Firestore profile
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      return { success: false, error: "User profile not found in Firestore." };
    }

    const userData = userSnap.data();
    return { success: true, user, userData };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
