const admin = require("firebase-admin");
const { jwtDecode } = require("jwt-decode");
const { doc, getDoc } = require("firebase/firestore");
const {db} = require("../firebase.config");

const serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class Middleware {
  async decodeToken(req, res, next) {
    let token = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return res.json({ message: "Token is missed" });
    }
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.json({ message: "Unauthorize" });
    } catch (e) {
      return res.json({ message: "Unauthorize" });
    }
  }

  checkIsAdmin() {
    return async (req, res, next) => {
      let token = "";
      let id = "";
      if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwtDecode(token);
        id = decoded.user_id;
      } else {
        return res.json({ message: "Token is missed" });
      }

      try {
        const userData = doc(db, `users/${id}`);
        const user = await getDoc(userData);
        if (!user.data().isAdmin) {
          return res.json({message: "Access denied"});
        }
        next();
      } catch (error) {
        return res.json({ message: "Access denied" });
      }
    };
  }
}

module.exports = new Middleware();
