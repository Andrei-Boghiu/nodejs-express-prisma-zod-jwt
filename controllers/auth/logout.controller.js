const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const userId = req.user?.id;
    const refreshToken = req.headers["x-refresh-token"];

    if (refreshToken && userId) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken, userId },
      });
    } else if (userId) {
      await prisma.refreshToken.deleteMany({
        where: { userId },
      });
    }

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return handleError(error, res, "logout.controller");
  }
};
