import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKEPvwOezBLtW_bfQaLpwkehkQpMP44SQ",
  authDomain: "devlink-fe868.firebaseapp.com",
  projectId: "devlink-fe868",
  storageBucket: "devlink-fe868.appspot.com",
  messagingSenderId: "839442748685",
  appId: "1:839442748685:web:5985476de7379219564c44",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
