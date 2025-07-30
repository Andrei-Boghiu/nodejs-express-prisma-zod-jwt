const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getPaginationParams } = require("../../utils/pagination.util");

module.exports = async (req, res) => {
  try {
    const email = (req.query.email || "").trim(); //filter by email

    const pageStr = req.query.page;
    const limitStr = req.query.limit;
    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { email: { contains: email, mode: "insensitive" } },
        orderBy: { email: "asc" },
        skip,
        take: limit,
      }),
      prisma.user.count({
        where: { email: { contains: email, mode: "insensitive" } },
      }),
    ]);

    res.status(200).json({
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error, res, "getUsers.controller");
  }
};
