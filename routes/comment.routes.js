const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const createComment = require("../controllers/comments/createComment.controller");
const getComments = require("../controllers/comments/getComments.controller");
const getCommentById = require("../controllers/comments/getCommentById.controller");
const updateComment = require("../controllers/comments/updateComment.controller");
const deleteComment = require("../controllers/comments/deleteComment.controller");

router.use(authMiddleware);

router.post("/", createComment);
router.get("/", getComments);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
