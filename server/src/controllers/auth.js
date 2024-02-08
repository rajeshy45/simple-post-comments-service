const { sendError } = require("../utils/utils");
const User = require("../models/user");
const { hash, verifyHash } = require("../utils/encryption");
const { sign } = require("../utils/jwt");
const { mapUser } = require("../utils/user");

const authControllers = {
  register: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!(username && password)) {
        return sendError("Username and password are required!", 400, res);
      }

      if (username.length < 6) {
        return sendError("Username must be at least 6 characters!", 400, res);
      }

      if (password.length < 8) {
        return sendError("Password must be at least 8 characters!", 400, res);
      }

      if (
        await User.findOne({ attributes: ["username"], where: { username } })
      ) {
        return sendError("Username already taken!", 409, res);
      }

      const user = await User.create({
        username,
        password: await hash(password),
      });

      const token = sign({ sub: username });

      res.json(mapUser({ ...user.toJSON(), token }));
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!(username && password)) {
        return sendError("Username and password are required!", 400, res);
      }

      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        return sendError("User not found!", 404, res);
      }

      if (!(await verifyHash(password, user.password))) {
        return sendError("Incorrect password!", 401, res);
      }

      const token = sign({ sub: username });

      res.json(mapUser({ ...user.toJSON(), token }));
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authControllers;
