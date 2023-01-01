import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBY0XjtVn1BZNRImb35q_pB-O9cExu6mr8",
  authDomain: "adaptive-read.firebaseapp.com",
  projectId: "adaptive-read",
  storageBucket: "adaptive-read.appspot.com",
  messagingSenderId: "378676341001",
  appId: "1:378676341001:web:dabcbf474028464d594bd8",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
