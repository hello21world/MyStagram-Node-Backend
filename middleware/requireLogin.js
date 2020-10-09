const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { findOne } = require("../controller/db.controller");
const ObjectId = require("mongodb").ObjectID;

const Error = require("../handlers/handler.error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, async (err, payload) => {
      if (!err) {
        const { _id } = payload;
        req.user = await findOne(
          "users",
          { _id: ObjectId(_id) },
          { password: 0 }
        );
        next();
      } else
        res.status(401).send(new Error({ message: "Unauthorized", code: 401 }));
    });
  } else
    res.status(401).send(new Error({ message: "Unauthorized", code: 401 }));
};
