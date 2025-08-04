const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const createTask = require("../controllers/tasks/createTask.controller");
const getTasks = require("../controllers/tasks/getTasks.controller");
const getTaskById = require("../controllers/tasks/getTaskById.controller");
const updateTask = require("../controllers/tasks/updateTask.controller");
const deleteTask = require("../controllers/tasks/deleteTask.controller");

router.use(authMiddleware);

router.post("/:milestoneId", createTask);
router.get("/:milestoneId", getTasks);
router.get("/id/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
