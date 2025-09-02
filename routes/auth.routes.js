const express = require("express");
const router = express.Router();

const register = require("../controllers/auth/register.controller");
const login = require("../controllers/auth/login.controller");
const logout = require("../controllers/auth/logout.controller");
const profile = require("../controllers/auth/profile.controller");
const refresh = require("../controllers/auth/refresh.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

router.use(authMiddleware);

router.delete("/logout", logout);
router.get("/profile", profile);

module.exports = router;
