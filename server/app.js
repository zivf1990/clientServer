//imports.
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

//import routers.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

//Settings.
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/", (req, res) => {
  res.send("api");
});

//Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
