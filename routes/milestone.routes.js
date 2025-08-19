const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const createMilestone = require("../controllers/milestones/createMilestone.controller");
const getMilestones = require("../controllers/milestones/getMilestones.controller");
const getMilestoneById = require("../controllers/milestones/getMilestoneById.controller");
const updateMilestone = require("../controllers/milestones/updateMilestone.controller");
const deleteMilestone = require("../controllers/milestones/deleteMilestone.controller");

router.use(authMiddleware);

router.post("/:projectId", createMilestone);
router.get("/:projectId", getMilestones);
router.get("/id/:id", getMilestoneById);
router.put("/:id", updateMilestone);
router.delete("/:id", deleteMilestone);

module.exports = router;
