import { auth } from './firebase';

// Sign In
export const doSignInWithPhoneNumber = (phonenumber) =>
  auth.signInWithPhoneNumber(phonenumber);