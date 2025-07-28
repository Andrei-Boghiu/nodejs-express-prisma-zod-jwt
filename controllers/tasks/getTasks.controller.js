const prisma = require("../../prisma/client");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
