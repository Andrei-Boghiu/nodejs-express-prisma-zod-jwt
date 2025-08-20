const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const createComment = require("../controllers/comments/createComment.controller");
const getComments = require("../controllers/comments/getComments.controller");
const getCommentById = require("../controllers/comments/getCommentById.controller");
const updateComment = require("../controllers/comments/updateComment.controller");
const deleteComment = require("../controllers/comments/deleteComment.controller");

router.use(authMiddleware);

router.post("/:taskId", createComment);
router.get("/:taskId", getComments);
router.get("/id/:id", getCommentById);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
