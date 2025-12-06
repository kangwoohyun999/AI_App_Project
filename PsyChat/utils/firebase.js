import firebase from 'firebase/app';
import 'firebase/auth';
import config from './firebase.json';
import { removeWhitespace } from './functions';

const app = firebase.initializeApp(config);
const Auth = app.auth();

export const login = async({ email, password }) => {
  email = removeWhitespace(email);
  password = removeWhitespace(password);
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signup = async({ name, email, password }) => {
  email = removeWhitespace(email);
  password = removeWhitespace(password);
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  await user.updateProfile({ displayName: name });
  return user;
};

export const logout = async() => {
  await Auth.signOut();
};
