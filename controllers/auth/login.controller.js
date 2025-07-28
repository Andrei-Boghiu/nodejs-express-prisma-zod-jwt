const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../../validators/user.validator");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

module.exports = async (req, res) => {
  try {
    // Validate input
    const { email, password } = loginSchema.parse(req.body);

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return token (and optionally user info)
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    if (err instanceof loginSchema.constructor) {
      return res.status(400).json({ error: err.errors });
    }
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
