const express = require("express");
const middleware = require("../middleware/index");

const {
  getProjectsHandler,
  getSingleProjectHandler,
  postProjectHandler,
  deleteProjectHandler,
  updateProjectHandler,
} = require("../controllers/projects");

const router = express.Router();

router.get("/", getProjectsHandler);
router.post("/", middleware.checkIsAdmin(), postProjectHandler);
router.get("/:projectId", getSingleProjectHandler);
router.delete("/:projectId", middleware.checkIsAdmin(), deleteProjectHandler);
router.patch("/:projectId", middleware.checkIsAdmin(), updateProjectHandler);

module.exports = router;
