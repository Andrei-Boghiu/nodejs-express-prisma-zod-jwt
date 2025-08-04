const { z } = require("zod");

const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
const statusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"]);
const projectStatusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED", "ARCHIVED"]);
const membershipRoleEnum = z.enum(["OWNER", "MANAGER", "CONTRIBUTOR", "VIEWER"]);

const description = z.string().trim().optional().nullable();

const optionalDatetime = z.iso.datetime().optional().nullable();

module.exports = {
  priorityEnum,
  statusEnum,
  projectStatusEnum,
  membershipRoleEnum,
  description,
  optionalDatetime,
};
