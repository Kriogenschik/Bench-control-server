const { doc, getDoc } = require("firebase/firestore");
const {db} = require("../firebase.config");

const handleSignIn = async (req, res) => {
  try {
    const userData = doc(db, `users/${req.params.userId}`);
    const user = await getDoc(userData);
    res.json(user.data());
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  handleSignIn,
};
