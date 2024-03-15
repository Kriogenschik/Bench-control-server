const express = require("express");
const middleware = require('../middleware/index');

const {
  getOptionsHandler,
  getSingleOptionHandler,
  deleteOptionHandler,
  addNewOptionHandler,
  updateOptionHandler
} = require("../controllers/options");

const router = express.Router();

router.get("/", getOptionsHandler );
router.get("/:optionId", getSingleOptionHandler);
// router.delete("/:optionId", middleware.checkIsAdmin(), deleteOptionHandler);
router.delete("/:optionId", deleteOptionHandler);
// router.patch("/:optionId", middleware.checkIsAdmin(), updateOptionHandler);
router.post("/:optionId", addNewOptionHandler);
router.put("/:optionId", updateOptionHandler);


module.exports = router;