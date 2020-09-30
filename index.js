const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const CONFIG = require('./config');

const account = require("./controller/account.controller");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// headers for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const routeMatcher = "user";

//route for user signup
router.post(`/${routeMatcher}/signup`, account.signUp);

//route for user signin
router.post(`/${routeMatcher}/signin`, account.signIn);

app.use("/", router);
app.listen(CONFIG.PORT, (res, err) => {
  if (err) {
    res.status(500).send(new Error(err));
  }
  console.log("server listening on port " + CONFIG.PORT);
});
