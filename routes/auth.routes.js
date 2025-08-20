const express = require("express");
const router = express.Router();

const register = require("../controllers/auth/register.controller");
const login = require("../controllers/auth/login.controller");
const logout = require("../controllers/auth/logout.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const profile = require("../controllers/auth/profile.controller");

router.post("/register", register);
router.post("/login", login);

router.use(authMiddleware);

router.delete("/logout", logout);
router.get("/profile", profile);

module.exports = router;
