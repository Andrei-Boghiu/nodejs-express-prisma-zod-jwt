const { ZodError } = require("zod");

function handleError(error, res, context = "Server") {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.errors });
  }

  console.error(`${context} error:`, error);
  return res.status(500).json({ error: "Internal server error" });
}

module.exports = handleError;
