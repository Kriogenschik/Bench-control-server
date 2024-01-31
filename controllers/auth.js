const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc } = require("firebase/firestore");
const {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

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
const auth = getAuth();
const db = getFirestore();

const handleSignIn = async (req, res) => {
  try {
    const userResponse = await signInWithEmailAndPassword(
      auth,
      req.body.name,
      req.body.password
    );
    const userData = await doc(db, `users/${userResponse.user.uid}`);
    const user = await getDoc(userData);
    res.json(user.data());
  } catch (error) {
    res.send(error);
  }
};

const handleSingOut = async (req, res) => {
  try {
    await signOut(auth);
    res.send({ mes: "sign out" });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  handleSignIn,
  handleSingOut,
};
