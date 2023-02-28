import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCnm2QmaaZX2j--q0afkxWIPu6lmZgMexM",
  authDomain: "fastandfresh-a7d16.firebaseapp.com",
  projectId: "fastandfresh-a7d16",
  storageBucket: "fastandfresh-a7d16.appspot.com",
  messagingSenderId: "744706160936",
  appId: "1:744706160936:web:30334fa618bda84858781d",
  measurementId: "G-TN0SJLTMKZ"
};

const app =initializeApp(firebaseConfig);
const db= getFirestore(app)

export default db
