// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
const app = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd1IahX_KGts6qn64ff7SBCFgwNxEI2fY",
  authDomain: "cse416-sigmabrain.firebaseapp.com",
  projectId: "cse416-sigmabrain",
  storageBucket: "cse416-sigmabrain.appspot.com",
  messagingSenderId: "749717527290",
  appId: "1:749717527290:web:a95321ce683081758bc743",
  measurementId: "G-SY9B3REDEQ"
};

// Initialize Firebase
const firebase_init = app.initializeApp(firebaseConfig);
console.log("firebase client is initialized")
module.exports = firebase_init