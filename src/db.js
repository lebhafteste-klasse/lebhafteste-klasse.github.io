// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCS-RjU1jtSfddOa-Cz3-tdHAqoUPwOgGI",
    authDomain: "klassenwebsite-ba906.firebaseapp.com",
    databaseURL: "https://klassenwebsite-ba906-default-rtdb.firebaseio.com",
    projectId: "klassenwebsite-ba906",
    storageBucket: "klassenwebsite-ba906.firebasestorage.app",
    messagingSenderId: "371327818196",
    appId: "1:371327818196:web:216f00c71e7b6293b79e41",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
