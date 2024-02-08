const router = require("express").Router();

const userRoutes = require("./user");
const authRoutes = require("./auth");
const postRoutes = require("./post");

// sample root route
router.get("/", (req, res) => {
  res.send("Welcome to Simple Post-Comments Service API. Nothing to see here.");
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

module.exports = router;
