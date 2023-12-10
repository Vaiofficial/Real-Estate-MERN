// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7a20e.firebaseapp.com",
  projectId: "mern-estate-7a20e",
  storageBucket: "mern-estate-7a20e.appspot.com",
  messagingSenderId: "930069745764",
  appId: "1:930069745764:web:e35b30ffbda6c602244f71",
  measurementId: "G-1260GZ1XN2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);