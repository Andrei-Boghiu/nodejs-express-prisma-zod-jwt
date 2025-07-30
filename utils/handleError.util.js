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
  // ? Handle Zod validation errors
  if (error instanceof ZodError) {
    const errors = JSON.parse(error.message);
    return res.status(400).json({ errors });
  }

  // ? Handle Prisma errors
  if (error.code === "P2000") {
    return res.status(400).json({
      error: `Input too long for field "${error.meta?.column_name || "unknown"}".`,
    });
  }

  if (error.code === "P2001") {
    return res.status(404).json({
      error: `Record not found for the specified condition.`,
    });
  }

  if (error.code === "P2002") {
    const fields = error.meta?.target?.join(", ") || "unknown";
    return res.status(409).json({
      error: `Conflict: A record with the same ${fields} already exists.`,
    });
  }

  if (error.code === "P2003") {
    return res.status(400).json({
      error: `Foreign key constraint failed on the field(s): ${error.meta?.field_name || "unknown"}.`,
    });
  }

  if (error.code === "P2011") {
    return res.status(400).json({
      error: `Null constraint failed on the field: ${error.meta?.field_name || "unknown"}.`,
    });
  }

  if (error.code === "P2025") {
    return res.status(404).json({
      error: error.meta?.cause || "The requested resource does not exist or was already deleted.",
    });
  }

  if (typeof error.code === "string" && error.code.startsWith("P2")) {
    return res.status(500).json({
      error: `Prisma error (${error.code}): ${error.message}`,
    });
  }

  // ? General fallback
  console.error(`${context} error:`, error);
  return res.status(500).json({ error: "Internal server error" });
}

module.exports = handleError;
