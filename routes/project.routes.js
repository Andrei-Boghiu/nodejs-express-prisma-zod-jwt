const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const createProject = require("../controllers/projects/createProject.controller");
const getProjects = require("../controllers/projects/getProjects.controller");
const getProjectById = require("../controllers/projects/getProjectById.controller");
const updateProject = require("../controllers/projects/updateProject.controller");
const deleteProject = require("../controllers/projects/deleteProject.controller");
const searchProjects = require("../controllers/projects/searchProjects.controller");

router.use(authMiddleware);

router.post("/", createProject);
router.get("/", getProjects);
router.get("/search", searchProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
