// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
    authDomain: "auth-app-c8c10.firebaseapp.com",
    projectId: "auth-app-c8c10",
    storageBucket: "auth-app-c8c10.appspot.com",
    messagingSenderId: "872019949483",
    appId: "1:872019949483:web:025cb497e8b93dce0484ee",
    measurementId: "G-KT0DHMD426"
};
const clientId = import.meta.env.VITE_FIRBASE_API_KEY;
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);