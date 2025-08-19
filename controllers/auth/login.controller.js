const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");
const { loginSchema } = require("../../validators/auth.validator");
const handleError = require("../../utils/handleError.util");
const { DUMMY_HASH } = require("../../configs/auth.config");
const loginService = require("../../services/login.service");

module.exports = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const hashedPassword = user ? user.password : DUMMY_HASH;

    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!user || !validPassword) {
      // ? random timeout to mislead possible timing attacks
      const randomMs = Math.floor(Math.random() * (500 - 10 + 1)) + 100;
      await new Promise((res) => setTimeout(res, randomMs));

      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await loginService(user);

    res.setHeader("x-access-token", accessToken);
    res.setHeader("x-refresh-token", refreshToken);

    const { password: _, ...publicUserObject } = user;
    res.json(publicUserObject);
  } catch (error) {
    return handleError(error, res, "login.controller");
  }
};
