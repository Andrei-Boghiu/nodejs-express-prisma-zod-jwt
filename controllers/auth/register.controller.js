const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");
const { registerSchema } = require("../../validators/auth.validator");
const handleError = require("../../utils/handleError.util");
const { loginService } = require("../../services/login.service");

module.exports = async (req, res) => {
  try {
    const { email, password, ...rest } = registerSchema.parse(req.body);

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
        ...rest,
      },
    });

    const publicUserObject = await loginService(res, user);

    res.status(201).json(publicUserObject);
  } catch (error) {
    return handleError(error, res, "register.controller");
  }
};
