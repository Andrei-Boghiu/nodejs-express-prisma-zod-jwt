const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const createMembership = require("../controllers/memberships/createMembership.controller");
const getMemberships = require("../controllers/memberships/getMemberships.controller");
const getMembershipById = require("../controllers/memberships/getMembershipById.controller");
const updateMembership = require("../controllers/memberships/updateMembership.controller");
const deleteMembership = require("../controllers/memberships/deleteMembership.controller");

router.use(authMiddleware);

router.post("/", createMembership);
router.get("/", getMemberships);
router.get("/:id", getMembershipById);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);

module.exports = router;
