// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnqcHmUuTyMM08BFDWBfjOZl6O3sbZVhg",
  authDomain: "psych-beacd.firebaseapp.com",
  projectId: "psych-beacd",
  storageBucket: "psych-beacd.firebasestorage.app",
  messagingSenderId: "163874017534",
  appId: "1:163874017534:web:e7c8c174c7e5765a1df5af",
  measurementId: "G-C4Q2CL2L94"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export const login = async ({ email, password }) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signup = async ({ email, password }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  return user;
};

export { auth };
