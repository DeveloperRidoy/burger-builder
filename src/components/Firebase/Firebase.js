import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCR7d3DYWezCYZi9YZemh3BZSIgVrIU32o",
  authDomain: "react-my-burger-45b03.firebaseapp.com",
  projectId: "react-my-burger-45b03",
  storageBucket: "react-my-burger-45b03.appspot.com",
  messagingSenderId: "920453383747",
  appId: "1:920453383747:web:b832b85942cbb706d1b6f6",
  measurementId: "G-EV7PTG2KLF",
};

//Initialize Firebase

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth()
export { db, firebaseConfig, auth};

export default firebase;