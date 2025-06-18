// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwFryu5lNERPorh-DesVy7houAaB_K2rc",
  authDomain: "behindkit-246dd.firebaseapp.com",
  projectId: "behindkit-246dd",
  storageBucket: "behindkit-246dd.firebasestorage.app",
  messagingSenderId: "120848695378",
  appId: "1:120848695378:web:443b49d8c0c92d50711f8b",
  measurementId: "G-9MWRDWR0V1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);