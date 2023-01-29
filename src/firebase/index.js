import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const ApiKey = process.env.FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: ApiKey,
  authDomain: "adpative-read.firebaseapp.com",
  projectId: "adpative-read",
  storageBucket: "adpative-read.appspot.com",
  messagingSenderId: "31823913660",
  appId: "1:31823913660:web:e20168e20b2c93b02466b9",
  measurementId: "G-KLSTQVT1TP",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

const db = getFirestore(app);
export { db, auth };
