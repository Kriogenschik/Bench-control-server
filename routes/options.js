const express = require("express");
const middleware = require('../middleware/index');

const {
  getOptionsHandler,
  getSingleOptionHandler,
  deleteOptionHandler,
  addNewOptionHandler,
} = require("../controllers/options");

const router = express.Router();

router.get("/", getOptionsHandler );
router.get("/:optionId", getSingleOptionHandler);
// router.delete("/:optionId", middleware.checkIsAdmin(), deleteOptionHandler);
router.delete("/:optionId", deleteOptionHandler);
// router.patch("/:optionId", middleware.checkIsAdmin(), updateOptionHandler);
router.post("/:optionId", addNewOptionHandler);

module.exports = router;