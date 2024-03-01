const express = require("express");
const middleware = require('../middleware/index');

const {
  getOptionsHandler,
  // getSingleOptionHandler,
  // deleteOptionHandler,
  // updateOptionHandler,
} = require("../controllers/options");

const router = express.Router();

router.get("/", getOptionsHandler );
// router.get("/:optionId", getSingleOptionHandler);
// router.delete("/:optionId", middleware.checkIsAdmin(), deleteOptionHandler);
// router.patch("/:optionId", middleware.checkIsAdmin(), updateOptionHandler);

module.exports = router;