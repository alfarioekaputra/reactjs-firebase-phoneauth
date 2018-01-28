import { auth } from './firebase';

// Sign In
export const doSignInWithPhoneNumber = (phonenumber, appVerifier) =>
  auth.signInWithPhoneNumber(phonenumber, appVerifier);

// Sign out
export const doSignOut = () =>
  auth.signOut();