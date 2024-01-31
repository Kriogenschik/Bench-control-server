// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {getAuth} = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZGQrN55ui0815u5wCejdnHVLC_U930HY",
  authDomain: "bench-control.firebaseapp.com",
  projectId: "bench-control",
  storageBucket: "bench-control.appspot.com",
  messagingSenderId: "329438605538",
  appId: "1:329438605538:web:c63d745b1b09cc9fa9eebb",
  measurementId: "G-FX9ME2NR5T"
};

// Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
initializeApp(firebaseConfig)
const auth = getAuth();
// const auth = firebase.auth();
// const database = firebase.database();
module.exports = {auth};
