const express = require("express");
const {
  handleSignIn,

} = require("../controllers/auth");

const router = express.Router();

router.get("/:userId", handleSignIn );

module.exports = router;