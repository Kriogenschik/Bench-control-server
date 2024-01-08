const express = require("express");
const {
  getOptionsHandler,
  getSingleOptionHandler,
  updateOptionHandler,
} = require("../controllers/options");

const router = express.Router();

router.get("/", getOptionsHandler );
router.get("/:optionId", getSingleOptionHandler);
router.patch("/:optionId", updateOptionHandler);

module.exports = router;