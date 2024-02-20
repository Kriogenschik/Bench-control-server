const express = require("express");
const {
  testSignIn,
} = require("../controllers/testAuth");

const router = express.Router();

router.get("/", testSignIn)

module.exports = router;