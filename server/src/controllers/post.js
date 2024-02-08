const Post = require("../models/post");
const User = require("../models/user");
const { mapPost } = require("../utils/post");
const { sendError } = require("../utils/utils");
const fs = require("fs");
const path = require("path");

const postControllers = {
  // get logged-in user's posts
  get: async (req, res, next) => {
    try {
      const posts = await Post.findAll({ where: { userId: req.user }, order: [["createdAt", "DESC"]], });

      if (!posts.length) {
        return sendError("No posts found!", 404, res);
      }

      res.json(posts.map((post) => post.toJSON()).map(mapPost));
    } catch (err) {
      next(err);
    }
  },

  // create new post
  create: async (req, res, next) => {
    try {
      const { title, description } = req.body;

      if (!(title && description)) {
        return sendError("Title and description are required!", 400, res);
      }

      const post = await Post.create({
        title,
        description,
        userId: req.user,
      });

      // storing image
      if (req.file) {
        const ext = path.extname(req.file.originalname).toLowerCase();
        const fileName = `${post.ext_id}${ext}`;
        const dest = path.join(req.file.destination, `/${fileName}`);

        if ([".png", ".jpg", ".jpeg"].includes(ext)) {
          fs.renameSync(req.file.path, dest);

          post.image = `uploads/${fileName}`;
          await post.save();
        } else {
          return sendError(
            "Only .png, .jpg, .jpeg files are supported!",
            409,
            res
          );
        }
      }

      res.json(mapPost(post.toJSON()));
    } catch (err) {
      next(err);
    }
  },

  // update a post
  updateByExtId: async (req, res, next) => {
    try {
      const extId = req.params.postId;

      if (!extId) {
        return sendError("Post Id is required!", 400, res);
      }

      const { title, description } = req.body;

      if (!(title && description)) {
        return sendError("Title and description are required!", 400, res);
      }

      let image = null;
      if (req.file) {
        const ext = path.extname(req.file.originalname).toLowerCase();
        const fileName = `${extId}${ext}`;
        const dest = path.join(req.file.destination, `/${fileName}`);

        if ([".png", ".jpg", ".jpeg"].includes(ext)) {
          fs.renameSync(req.file.path, dest);

          image = `uploads/${fileName}`;
        } else {
          return sendError(
            "Only .png, .jpg, .jpeg files are supported!",
            409,
            res
          );
        }
      }

      const result = await Post.update(
        {
          title,
          description,
          image,
        },
        {
          where: {
            ext_id: extId,
            userId: req.user,
          },
        }
      );

      console.log(result);

      if (!result[0]) {
        if (req.file) {
          // deleting uploaded file
          fs.unlinkSync(
            path.join(
              req.file.destination,
              `/${extId}${path.extname(req.file.originalname).toLowerCase()}`
            )
          );
        }
        return sendError("Error updating post!", 409, res);
      }

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  // get other posts
  getAll: async (req, res, next) => {
    try {
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

      const posts = await Post.findAll({
        offset: offset,
        limit: per_page,
        order: [["createdAt", "DESC"]],
        include: User,
      });

      res.json(posts.map((post) => post.toJSON()).map(mapPost));
    } catch (err) {
      next(err);
    }
  },

  // get other post by external id
  getByExtId: async (req, res, next) => {
    try {
      const extId = req.params.postId;

      if (!extId) {
        return sendError("Post Id is required!", 400, res);
      }

      const post = await Post.findOne({
        where: { ext_id: extId },
        include: User,
      });

      if (!post) {
        return sendError("Post not found!", 404, res);
      }

      res.json(mapPost(post.toJSON()));
    } catch (err) {
      next(err);
    }
  },

  // delete a post
  deleteByExtId: async (req, res, next) => {
    try {
      const extId = req.params.postId;

      if (!extId) {
        return sendError("Post Id is required!", 400, res);
      }

      const result = await Post.destroy({
        where: { ext_id: extId, userId: req.user },
      });

      if (!result) {
        return sendError("Error deleting post!", 409, res);
      }

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = postControllers;
