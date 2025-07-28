const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../../validators/user.validator");
const handleError = require("../../utils/handleError.util");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";
const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8U5vOXk3ih6f4HZni9eN5vKGqDqm.e";

module.exports = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    const hashedPassword = user ? user.password : DUMMY_HASH;

    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!user || !validPassword) {
      // random timeout to mislead possible timing attacks
      const randomMs = Math.floor(Math.random() * (500 - 10 + 1)) + 100;
      await new Promise((res) => setTimeout(res, randomMs));

      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    return handleError(error, res, "login.controller");
  }
};
