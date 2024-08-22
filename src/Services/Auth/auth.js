import { signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
  } from 'firebase/auth';

import { auth } from '../../firebase'

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return {
      res: "success",
      content: user,
    }
  } catch (error) {
    console.error('Error signing in:', error);
    return {
      res: "error",
      content: error,
    }
  }
}

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userInfo = {
      uid: user.uid,
      email: user.email,
    };
    return userInfo;
  } catch (error) {
    console.error('Error signing up:', error);
    return error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return error;
  }
}
