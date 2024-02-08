const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
const { mapComment } = require("../utils/comment");
const { sendError } = require("../utils/utils");

const commentControllers = {
  // create new comment
  create: async (req, res, next) => {
    try {
      const extId = req.params.postId;

      if (!extId) {
        return sendError("Post Id is required!", 400, res);
      }

      const post = await Post.findOne({
        attributes: ["id"],
        where: { ext_id: extId },
      });

      if (!post) {
        return sendError("Post not found!", 404, res);
      }

      const { text } = req.body;

      if (!text) {
        return sendError("Text is required!", 400, res);
      }

      const comment = await Comment.create({
        text,
        userId: req.user,
        postId: post.id,
      });

      res.json(mapComment(comment.toJSON()));
    } catch (err) {
      next(err);
    }
  },

  // update a comment
  updateByExtId: async (req, res, next) => {
    try {
      const postExtId = req.params.postId;

      if (!postExtId) {
        return sendError("Post Id is required!", 400, res);
      }

      const post = await Post.findOne({
        attributes: ["id"],
        where: { ext_id: postExtId },
      });

      if (!post) {
        return sendError("Post not found!", 404, res);
      }

      const extId = req.params.commentId;

      if (!extId) {
        return sendError("Comment Id is required!", 400, res);
      }

      const { text } = req.body;

      if (!text) {
        return sendError("Text is required!", 400, res);
      }

      const result = await Comment.update(
        {
          text,
        },
        {
          where: {
            ext_id: extId,
            userId: req.user,
            postId: post.id,
          },
        }
      );

      if (!result[0]) {
        return sendError("Error updating comment!", 409, res);
      }

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  // get all comments of a post
  getAll: async (req, res, next) => {
    try {
      const postExtId = req.params.postId;

      if (!postExtId) {
        return sendError("Post Id is required!", 400, res);
      }

      const post = await Post.findOne({
        attributes: ["id"],
        where: { ext_id: postExtId },
      });

      if (!post) {
        return sendError("Post not found!", 404, res);
      }

      let { page, per_page } = req.query;

      if (!page) {
        page = 1;
      } else {
        page = Number(page);
      }

      if (!per_page) {
        per_page = 10;
      } else {
        per_page = Number(per_page);
      }

      const offset = (page - 1) * per_page;

      const comments = await Comment.findAll({
        offset: offset,
        limit: per_page,
        where: {
          postId: post.id,
        },
        order: [["createdAt", "DESC"]],
        include: User,
      });

      res.json(comments.map((comment) => comment.toJSON()).map(mapComment));
    } catch (err) {
      next(err);
    }
  },

  // delete a comment
  deleteByExtId: async (req, res, next) => {
    try {
      const postExtId = req.params.postId;

      if (!postExtId) {
        return sendError("Post Id is required!", 400, res);
      }

      const post = await Post.findOne({
        attributes: ["id"],
        where: { ext_id: postExtId },
      });

      if (!post) {
        return sendError("Post not found!", 404, res);
      }

      const extId = req.params.commentId;

      if (!extId) {
        return sendError("Comment Id is required!", 400, res);
      }

      const result = await Comment.destroy({
        where: { ext_id: extId, userId: req.user, postId: post.id },
      });

      if (!result) {
        return sendError("Error deleting comment!", 409, res);
      }

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = commentControllers;
