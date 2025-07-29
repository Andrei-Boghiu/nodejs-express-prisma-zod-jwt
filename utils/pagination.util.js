/**
 * Sanitize and validate pagination parameters from query strings.
 * @param {string|undefined} pageStr - page number as string
 * @param {string|undefined} limitStr - limit number as string
 * @param {object} options - optional settings
 * @param {number} options.defaultPage - default page number (default: 1)
 * @param {number} options.defaultLimit - default limit (default: 25)
 * @param {number} options.maxLimit - maximum allowed limit (default: 100)
 * @returns {{ page: number, limit: number, skip: number }}
 */
function getPaginationParams(pageStr, limitStr, options = {}) {
  const defaultPage = options.defaultPage ?? 1;
  const defaultLimit = options.defaultLimit ?? 25;
  const maxLimit = options.maxLimit ?? 100;

  let page = parseInt(pageStr, 10);
  if (isNaN(page) || page < 1) page = defaultPage;

  let limit = parseInt(limitStr, 10);
  if (isNaN(limit) || limit < 1) limit = defaultLimit;
  else if (limit > maxLimit) limit = maxLimit;

  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

module.exports = { getPaginationParams };
