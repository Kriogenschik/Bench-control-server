const express = require("express");
const middleware = require('../middleware/index');

const {
  getStaffsHandler,
  getSingleStaffHandler,
  postStaffHandler,
  deleteStaffHandler,
  updateStaffHandler
} = require("../controllers/staff");

const router = express.Router();

router.get("/", getStaffsHandler );
// router.post("/", middleware.checkIsAdmin(), postStaffHandler);
router.post("/", postStaffHandler);
router.get("/:staffId", getSingleStaffHandler);
// router.delete("/:staffId", middleware.checkIsAdmin(), deleteStaffHandler);
router.delete("/:staffId", deleteStaffHandler);
// router.patch("/:staffId", middleware.checkIsAdmin(), updateStaffHandler);
router.put("/:staffId", updateStaffHandler);

module.exports = router;