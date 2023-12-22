const express = require("express");
const staffsRouter = require("./staffs");
const optionsRouter = require("./options");
const projectsRouter = require("./projects");
const rootRouter = require("./root");

const router = express.Router();

router.use("/staffs", staffsRouter);
router.use("/options", optionsRouter);
router.use("/projects", projectsRouter);
router.use("/", rootRouter);

module.exports = router;
