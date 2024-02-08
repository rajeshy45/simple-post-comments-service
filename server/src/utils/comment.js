const { mapUser } = require("./user");

function mapComment(comment) {
  const obj = {
    ...comment,
    id: comment.ext_id,
  };

  if (comment.user) {
    obj.user = mapUser(comment.user);
  }

  delete obj.ext_id;
  delete obj.postId;
  delete obj.userId;

  return obj;
}

module.exports = { mapComment };
