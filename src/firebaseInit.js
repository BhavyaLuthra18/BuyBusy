// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEE0SC7R9Xw-f3ia1qNW7G257fmAVPlqQ",
  authDomain: "buy-busy-ii-redux-version.firebaseapp.com",
  projectId: "buy-busy-ii-redux-version",
  storageBucket: "buy-busy-ii-redux-version.appspot.com",
  messagingSenderId: "187146620636",
  appId: "1:187146620636:web:51c69e94673e6497f4ae19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);