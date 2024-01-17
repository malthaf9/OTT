// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjODdCaRqt1AfeiWooaQ-y7imYxVR-IFw",
  authDomain: "netflixgpt-5c35c.firebaseapp.com",
  projectId: "netflixgpt-5c35c",
  storageBucket: "netflixgpt-5c35c.appspot.com",
  messagingSenderId: "655718102415",
  appId: "1:655718102415:web:fbea02ed5b61dbea4547fa",
  measurementId: "G-6HZRY23G9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();