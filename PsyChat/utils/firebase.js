import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfmQU5NBRlB_oTDPAQukEt348cWQy9v9U",
  authDomain: "aiappproject-b3a30.firebaseapp.com",
  projectId: "aiappproject-b3a30",
  storageBucket: "aiappproject-b3a30.firebasestorage.app",
  messagingSenderId: "243555863658",
  appId: "1:243555863658:web:1edc711e21595fcdf84e13",
  measurementId: "G-DRZ26J9RG4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase;
const Auth = app.auth();
const Firestore = app.firestore();

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const logout = async () => {
  await Auth.signOut();
};

export const signup = async ({ email, password, name }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);

  // name 설정만 진행
  await user.updateProfile({
    displayName: name || '',
  });

  await Firestore.collection('users').doc(user.uid).set({
    email: user.email,
    displayName: name || '',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return user;
};

export default {
  app,
  Auth,
  Firestore,
  login,
  signup,
  logout
};
