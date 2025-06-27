import { auth } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Helper function to sign up a user
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
    // 1. Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // // 2. Optionally update display name
    // await updateProfile(user, { displayName: fullName });

    // // 3. Create user document in Firestore
    // await setDoc(doc(db, "users", user.uid), {
    //   uid: user.uid,
    //   fullName,
    //   email,
    //   phoneNumber,
    //   dateOfBirth,
    //   createdAt: new Date().toISOString(),
    // });

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Helper function to sign in a user
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
