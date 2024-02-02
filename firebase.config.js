// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZGQrN55ui0815u5wCejdnHVLC_U930HY",
  authDomain: "bench-control.firebaseapp.com",
  projectId: "bench-control",
  storageBucket: "bench-control.appspot.com",
  messagingSenderId: "329438605538",
  appId: "1:329438605538:web:c63d745b1b09cc9fa9eebb",
  measurementId: "G-FX9ME2NR5T",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

module.exports = { auth, db };
