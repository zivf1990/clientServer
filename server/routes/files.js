var express = require("express");
var router = express.Router();
const fs = require("fs");
const {
  readFolder,
  readFile,
  deleteFile,
  deleteFolder,
} = require("../public/javascripts/fileSys");

router.get("/", function (req, res, next) {
  res.send("main");
});

/* PUT files listing. */
router.put("/:username/readfolder", async (req, res) => {
  const path = req?.body?.path;

  console.log("PUT folder list ", path);
  readFolder(
    `${path ? `${path}` : `./files/${req.params.username}`}`,
    (items) => {
      res.json(items);
    }
  );
});

router.put("/:username/readfile", async (req, res) => {
  const path = req?.body?.path;

  readFile(path, (data) => {
    res.json(data);
  });

  console.log("PUT file list ", path);
});

//GET user top level items.
// router.get("/:username", async (req, res) => {
//   console.log("GET user top ", "top");
//   readFolder(`./files/${req.params.username}`, (items) => {
//     console.log(items);
//     res.json(items);
//   });
// });

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

router.post(`/newfile`, async (req, res) => {
  console.log("files recieved POST req to create new file");
});

router.post(`/newfolder`, async (req, res) => {
  console.log("files recieved POST req to create new folder");
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
