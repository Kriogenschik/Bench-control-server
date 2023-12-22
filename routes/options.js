const express = require("express");
const {
  getOptionsHandler,
  getSingleOptionHandler,
  postOptionHandler,
  updateOptionHandler,
} = require("../controllers/options");

const router = express.Router();

router.get("/", getOptionsHandler );
router.post("/", postOptionHandler);
router.get("/:optionId", getSingleOptionHandler);
router.patch("/:optionId", updateOptionHandler);

module.exports = router;