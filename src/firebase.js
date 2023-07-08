// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8sCIAcHFjBMQat-2Uwkn40dAcHrsdwo0",
  authDomain: "viral-music-app.firebaseapp.com",
  projectId: "viral-music-app",
  storageBucket: "viral-music-app.appspot.com",
  messagingSenderId: "934629826800",
  appId: "1:934629826800:web:53b211a33a369945a72235"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);