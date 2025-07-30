const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const getUsers = require("../controllers/users/getUsers.controller");
const getUserById = require("../controllers/users/getUserById.controller");
const updateUser = require("../controllers/users/updateUser.controller");

router.use(authMiddleware);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/", updateUser);

module.exports = router;
