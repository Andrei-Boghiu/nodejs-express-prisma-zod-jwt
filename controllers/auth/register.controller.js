const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");
const { registerSchema } = require("../../validators/user.validator");

module.exports = async (req, res) => {
  try {
    // Validate request body
    const { email, password } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // return user (excluding password)
    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }

    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
