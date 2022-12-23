import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2FsWtERmBdkkdLbez7OC3QDoNsF8a1fY",
  authDomain: "adpative-read.firebaseapp.com",
  projectId: "adpative-read",
  storageBucket: "adpative-read.appspot.com",
  messagingSenderId: "31823913660",
  appId: "1:31823913660:web:e20168e20b2c93b02466b9",
  measurementId: "G-KLSTQVT1TP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
