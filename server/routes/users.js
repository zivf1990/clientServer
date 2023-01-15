var express = require("express");
var router = express.Router();
const fs = require("fs");
let userFiles = [];

//The fs.unlink() method deletes the specified file.
const deleteFile = (file) => {
  fs.unlink(file, function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
};

const renameFile = (file, newFileName) => {
  fs.rename(file, newFileName, function (err) {
    if (err) throw err;
    console.log("File Renamed!");
  });
};

const writeFile = (filePath, data) => {
  fs.writeFile(filePath, data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const readFile = async (filePath) => {
  await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    userFiles = data;
    console.log("userFiles: ", userFiles);
  });
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//GET user files.
router.get("/:username", async (req, res) => {
  // writeFile("ziv.txt", JSON.stringify(dummyData));
  await readFile(`${req.params.username}.txt`);
  res.send(userFiles);
});

module.exports = router;
