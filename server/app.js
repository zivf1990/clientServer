//imports.
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");

//import routers.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const filesRouter = require("./routes/files");

//initialize express.
const app = express();

//Settings.
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));
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

//Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/files", filesRouter);

//global variables.
let userFiles = [];
const dummyData = [
  { fileName: "test1", fileSize: "24kb", data: "24/02/2022" },
  { fileName: "test2", fileSize: "24kb", data: "24/02/2022" },
  { fileName: "test3", fileSize: "24kb", data: "24/02/2022" },
  { fileName: "test4", fileSize: "24kb", data: "24/02/2022" },
  { fileName: "test5", fileSize: "24kb", data: "24/02/2022" },
  { fileName: "test6", fileSize: "24kb", data: "24/02/2022" },
  { fileName: "test7", fileSize: "24kb", data: "24/02/2022" },
];

module.exports = app;
