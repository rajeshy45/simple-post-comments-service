const commentControllers = require("../../controllers/comment");
const postControllers = require("../../controllers/post");
const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const upload = multer({
  dest: path.join(__dirname, "../../../public/uploads"),
  limits: {
    fieldSize: 1024 * 5, // max image size is 5 MB
  },
});

router.get("/me", postControllers.get);
router.post("/", upload.single("post-image"), postControllers.create);
router.get("/", postControllers.getAll);
router.get("/:postId", postControllers.getByExtId);
router.delete("/:postId", postControllers.deleteByExtId);
router.put(
  "/:postId",
  upload.single("post-image"),
  postControllers.updateByExtId
);
router.get("/:postId/comments", commentControllers.getAll);
router.post("/:postId/comments", commentControllers.create);
router.delete("/:postId/comments/:commentId", commentControllers.deleteByExtId);
router.put("/:postId/comments/:commentId", commentControllers.updateByExtId);

module.exports = router;
