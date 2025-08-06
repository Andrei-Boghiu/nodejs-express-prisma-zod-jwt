const refreshTokens = require("../../services/refresh.service");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const result = await refreshTokens(req, res);

    if (result.error) {
      return res.status(result.error.status).json({ error: result.error.message });
    }

    return res.json({ message: "Access token refreshed" });
  } catch (error) {
    return handleError(error, res, "refresh.controller");
  }
};
