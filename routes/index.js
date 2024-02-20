const express = require("express");
const staffsRouter = require("./staffs");
const authRouter = require("./auth");
const optionsRouter = require("./options");
const projectsRouter = require("./projects");
const rootRouter = require("./root");

const testAuthRouter = require("./testAuth");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/testauth", testAuthRouter);
router.use("/staffs", staffsRouter);
router.use("/options", optionsRouter);
router.use("/projects", projectsRouter);
router.use("/", rootRouter);

module.exports = router;
