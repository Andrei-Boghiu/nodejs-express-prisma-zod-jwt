const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");
const { registerSchema } = require("../../validators/auth.validator");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const { email, password } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    return handleError(error, res, "register.controller");
  }
};
