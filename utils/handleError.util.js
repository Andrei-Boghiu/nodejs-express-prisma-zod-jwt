const { ZodError } = require("zod");

/**
 * Global error handler for controller logic.
 *
 * - Handles Zod validation errors with a 400 status code.
 * - Logs unexpected errors to the console and responds with a 500.
 *
 * - Reference: https://zod.dev/basics?id=handling-errors
 *
 * @param {Error} error - The thrown error object.
 * @param {import("express").Response} res - Express response object.
 * @param {string} [context="Server"] - Optional context label for error logging.
 * @returns {import("express").Response} JSON response with appropriate status and message.
 */
function handleError(error, res, context = "Server") {
  if (error instanceof ZodError) {
    const errors = JSON.parse(error.message);
    return res.status(400).json({ errors });
  }

  console.error(`${context} error:`, error);
  return res.status(500).json({ error: "Internal server error" });
}

module.exports = handleError;
