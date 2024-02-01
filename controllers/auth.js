const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCZGQrN55ui0815u5wCejdnHVLC_U930HY",
  authDomain: "bench-control.firebaseapp.com",
  projectId: "bench-control",
  storageBucket: "bench-control.appspot.com",
  messagingSenderId: "329438605538",
  appId: "1:329438605538:web:c63d745b1b09cc9fa9eebb",
  measurementId: "G-FX9ME2NR5T",
};

initializeApp(firebaseConfig);
const db = getFirestore();

const handleSignIn = async (req, res) => {
  try {
    const userData = await doc(db, `users/${req.params.userId}`);
    const user = await getDoc(userData);
    res.json(user.data());
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  handleSignIn,
};
