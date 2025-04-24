// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLtKgieSTTvQ5TlNl93oVWjFY0lUtGT4s",
  authDomain: "imgenhancement-17548.firebaseapp.com",
  projectId: "imgenhancement-17548",
  storageBucket: "imgenhancement-17548.firebasestorage.app",
  messagingSenderId: "1069975614052",
  appId: "1:1069975614052:web:d27349056e7fc80ee3e571",
  
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


