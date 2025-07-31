const { z } = require("zod");

const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
const statusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"]);
const projectStatusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED", "ARCHIVED"]);
const collaboratorRoleEnum = z.enum(["OWNER", "MANAGER", "MEMBER", "VIEWER"]);

const description = z.string().trim().optional().nullable();

const optionalDatetime = z.iso.datetime.optional().nullable();

module.exports = {
  priorityEnum,
  statusEnum,
  projectStatusEnum,
  collaboratorRoleEnum,
  description,
  optionalDatetime,
};
