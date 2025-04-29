import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAPawszna25UgMDOxsjVjfSll04THtwuJ4",
    authDomain: "erp-9cea5.firebaseapp.com",
    projectId: "erp-9cea5",
    storageBucket: "erp-9cea5.firebasestorage.app",
    messagingSenderId: "414276009484",
    appId: "1:414276009484:web:b07ea4b40d9d80f0d5b829",
    measurementId: "G-H9J6KWBWRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };