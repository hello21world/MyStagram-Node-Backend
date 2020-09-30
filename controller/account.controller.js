const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { get, findOne, insertOne } = require("./db.controller");
const Error = require("../handlers/handler.error");
const Success = require("../handlers/handler.success");
const CONFIG = require("../config");
const { query } = require("express");

module.exports = {
  signUp: async (req, res) => {
    const { name, email, username, password } = req.body;
    if (name && username && email && password) {
      const userExist = await findOne("users", { email });
      if (!userExist) {
        const user = {
          name,
          email,
          username,
          password: await bcrypt.hash(password, 12).then((d) => d),
        };
        const addUser = await insertOne("users", user);
        if (addUser && addUser.insertedCount) {
          res.status(200).send(new Success("User Created Successfully"));
        } else
          res
            .status(500)
            .send(new Error({ message: addUser.message, code: 503 }));
      } else
        res
          .status(500)
          .send(new Error({ message: "User already exists", code: 501 }));
    } else
      res
        .status(500)
        .send(new Error({ message: "Required field missing", code: 502 }));
  },

  signIn: async (req, res) => {
    const { email, username, password } = req.body;
    if ((email || username) && password) {
      const query = _.pick(req.body, ['username', 'email'])
      const user = await findOne("users", query);
      if (user) {
        bcrypt.compare(password, user.password).then((doMatch) => {
          if (doMatch) {
            delete user.password;
            const token = jwt.sign(user, CONFIG.JWT_SECRET);
            res.status(200).send(new Success(token));
          } else
            res
              .status(400)
              .send(new Error({message: "Username / Password mismatch",code: 401}));
        });
      } else
        res
          .status(400)
          .send(new Error({ message: "User doesn't exist", code: 402 }));
    } else
      res
        .status(500)
        .send(new Error({ message: "Required field missing", code: 502 }));
  },
};
