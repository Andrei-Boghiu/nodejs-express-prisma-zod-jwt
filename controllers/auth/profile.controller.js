const prisma = require("../../prisma/client");

module.exports = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await prisma.user.findUnique({ where: { id }, omit: { refreshToken: true, password: true } });

    if (!user) {
      return res.status(400).json({ error: "Invalid request" });
    }

    res.status(200).json(user);
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
