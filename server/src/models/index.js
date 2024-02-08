const sequelize = require("../db");
const Comment = require("./comment");
const Post = require("./post");
const User = require("./user");

function config() {
  // One to Many relationship between user and post
  User.hasMany(Post, { onDelete: "CASCADE" });
  Post.belongsTo(User);

  // One to Many relationship between post and comment
  Post.hasMany(Comment, { onDelete: "CASCADE" });
  Comment.belongsTo(Post);

  // One to Many relationship between user and comment
  User.hasMany(Comment, { onDelete: "CASCADE" });
  Comment.belongsTo(User);

  // synchronizing with the database
  (async () => {
    await sequelize.sync({ alter: true, force: false });
  })();
}

module.exports = { config };
