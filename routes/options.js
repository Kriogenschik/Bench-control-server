const express = require("express");
const {
  getOptionsHandler,
  getSingleOptionHandler,
  deleteOptionHandler,
  updateOptionHandler,
} = require("../controllers/options");

const router = express.Router();

router.get("/", getOptionsHandler );
router.get("/:optionId", getSingleOptionHandler);
router.delete("/:optionId", deleteOptionHandler);
router.patch("/:optionId", updateOptionHandler);

module.exports = router;