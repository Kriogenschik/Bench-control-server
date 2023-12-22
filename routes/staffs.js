const express = require("express");
const {
  getStaffsHandler,
  getSingleStaffHandler,
  postStaffHandler,
  deleteStaffHandler,
  updateStaffHandler
} = require("../controllers/staffs");

const router = express.Router();

router.get("/", getStaffsHandler );
router.post("/", postStaffHandler);
router.get("/:staffId", getSingleStaffHandler);
router.delete("/:staffId", deleteStaffHandler);
router.patch("/:staffId", updateStaffHandler);

module.exports = router;