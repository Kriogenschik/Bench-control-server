const express = require("express");
const middleware = require("../middleware/index");

const {
  getProjectsHandler,
  postProjectHandler,
  deleteProjectHandler,
  updateProjectHandler,
} = require("../controllers/projects");

const router = express.Router();

router.get("/", getProjectsHandler);
// router.post("/", middleware.checkIsAdmin(), postProjectHandler);
router.post("/", postProjectHandler);
// router.delete("/:projectId", middleware.checkIsAdmin(), deleteProjectHandler);
router.delete("/:projectId", deleteProjectHandler);
// router.patch("/:projectId", middleware.checkIsAdmin(), updateProjectHandler);
router.put("/:projectId", updateProjectHandler);

module.exports = router;
