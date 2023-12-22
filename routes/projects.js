const express = require("express");
const {
  getProjectsHandler,
  getSingleProjectHandler,
  postProjectHandler,
  deleteProjectHandler,
  updateProjectHandler
} = require("../controllers/projects");

const router = express.Router();

router.get("/", getProjectsHandler );
router.post("/", postProjectHandler);
router.get("/:projectId", getSingleProjectHandler);
router.delete("/:projectId", deleteProjectHandler);
router.patch("/:projectId", updateProjectHandler);

module.exports = router;