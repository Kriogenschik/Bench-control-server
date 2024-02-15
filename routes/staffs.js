const express = require("express");
const middleware = require('../middleware/index');

const {
  getStaffsHandler,
  getSingleStaffHandler,
  postStaffHandler,
  deleteStaffHandler,
  updateStaffHandler
} = require("../controllers/staffs");

const router = express.Router();

router.get("/", getStaffsHandler );
router.post("/", middleware.checkIsAdmin(), postStaffHandler);
router.get("/:staffId", getSingleStaffHandler);
router.delete("/:staffId", middleware.checkIsAdmin(), deleteStaffHandler);
router.patch("/:staffId", middleware.checkIsAdmin(), updateStaffHandler);

module.exports = router;