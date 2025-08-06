const express = require("express");
const router = express.Router();

const register = require("../controllers/auth/register.controller");
const login = require("../controllers/auth/login.controller");
const refresh = require("../controllers/auth/refresh.controller");
const logout = require("../controllers/auth/logout.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const profile = require("../controllers/auth/profile.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/refresh", refresh);
router.get("/logout", logout);

router.use(authMiddleware);

router.get("/profile", profile);

module.exports = router;
