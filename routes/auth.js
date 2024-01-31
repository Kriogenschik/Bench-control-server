const express = require("express");
const {
  handleSignIn,
  handleSingOut

} = require("../controllers/auth");

const router = express.Router();

router.post("/", handleSignIn );
router.get("/", handleSingOut );

module.exports = router;