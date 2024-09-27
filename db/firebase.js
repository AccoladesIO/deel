// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZ3snqInzNPX-hUKSo9Cx4Q77E0d_PInU",
    authDomain: "deel-12390.firebaseapp.com",
    projectId: "deel-12390",
    storageBucket: "deel-12390.appspot.com",
    messagingSenderId: "1098062303420",
    appId: "1:1098062303420:web:060b0db590b68acb2ec0b9",
    measurementId: "G-N5G7J27JMD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);