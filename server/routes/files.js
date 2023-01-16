var express = require("express");
var router = express.Router();
const fs = require("fs");
const {
  readFolder,
  readFile,
  getStats,
  deleteFile,
  deleteFolder,
} = require("../public/javascripts/fileSys");

/* GET files listing. */
router.get("/", function (req, res, next) {
  res.send("main");
});

//GET user files.
router.get("/:username", async (req, res) => {
  readFolder(`./files/${req.params.username}`, (items) => {
    console.log(items);
    res.json(items);
  });
});

//Delete an item.
router.delete("/:username/:filename", async (req, res) => {
  console.log("delete request ", req.params);
  const path = `./files/${req.params.username}/${req.params.filename}`;
  console.log("body ", req.body);
  //Deleting a File.
  if (req.body.isAFile) {
    deleteFile(path, (result) => {
      res.send(result);
    });
  }
  //Delete a Folder.
  else {
    deleteFolder(path, (result) => {
      res.send(result);
    });
  }
});

//open file/folder.
router.get("/:username/:filename", async (req, res) => {
  // const absolutePath = path.resolve("./files/", file);
  console.log("req.url ", req.url);

  fs.stat(`./files/${req.url}`, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    //File
    if (stats.isFile()) {
      readFile(
        `./files/${req.params.username}/${req.params.filename}`,
        (fileData) => {
          console.log(fileData);
          res.json(fileData);
        }
      );
    }
    //Directory.
    else if (stats.isDirectory()) {
      readFolder(`./files/${req.params.username}`, (files) => {
        res.json(files);
        console.log(files);
      });
    }
  });
});

module.exports = router;
