import * as firebase from 'firebase';

//basic login
export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);
