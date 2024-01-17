const express = require("express");
const {
  getAuthHandler,

} = require("../controllers/auth");

const router = express.Router();

router.post("/", getAuthHandler );

module.exports = router;