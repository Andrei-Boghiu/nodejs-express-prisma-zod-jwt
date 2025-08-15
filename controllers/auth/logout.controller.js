const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { COOKIE_OPTIONS } = require("../../configs/auth.config");

module.exports = async (req, res) => {
  try {
    res.clearCookie("accessToken", COOKIE_OPTIONS);
    res.clearCookie("refreshToken", COOKIE_OPTIONS);

    const userId = req.user?.id;

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    }

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return handleError(error, res, "logout.controller");
  }
};
