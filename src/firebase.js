import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAmbK4VSoMXC54wD_a_1SpaUk7vnSolSJ0",
  authDomain: "facebook-messenger-clone-b33af.firebaseapp.com",
  projectId: "facebook-messenger-clone-b33af",
  storageBucket: "facebook-messenger-clone-b33af.appspot.com",
  messagingSenderId: "356668334956",
  appId: "1:356668334956:web:3b0483125e69c9fe38c949",
  measurementId: "G-NZPWTNWBDE",
});

const db = firebaseApp.firestore();

export default db;
