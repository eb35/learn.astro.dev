// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8U_mGewiZpTSnVCV2MvIvFVTzpzN1Y8c",
    authDomain: "astro-course-module-11-34677.firebaseapp.com",
    projectId: "astro-course-module-11-34677",
    storageBucket: "astro-course-module-11-34677.firebasestorage.app",
    messagingSenderId: "869342782628",
    appId: "1:869342782628:web:1ed8741f5f3e643b683231"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const projectAuth = getAuth(app);