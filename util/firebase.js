// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2lfE3lcYLl7saxBPWtpWi_dL7IlLoNBw",
  authDomain: "hackdfw22.firebaseapp.com",
  projectId: "hackdfw22",
  storageBucket: "hackdfw22.appspot.com",
  messagingSenderId: "97067882803",
  appId: "1:97067882803:web:c6e0fbb4baec8922770646",
  measurementId: "G-PC3SQCY8VS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
