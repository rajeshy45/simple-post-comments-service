const { mapUser } = require("./user");

function mapPost(post) {
  const obj = {
    ...post,
    id: post.ext_id,
  };

  if (post.user) {
    obj.user = mapUser(post.user);
  }

  delete obj.ext_id;
  delete obj.userId;

  return obj;
}

module.exports = { mapPost };
