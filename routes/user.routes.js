const express = require("express");
const router = express.Router();

const register = require("../controllers/auth/register.controller");
const login = require("../controllers/auth/login.controller");

// Public routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
