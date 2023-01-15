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

const createDirectory = async (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, (err) => {
      if (err) console.log(err);
      else console.log("Directory  created: ", dirPath);
    });
  }
};

// createDirectory("./files/ziv");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//GET user files.
router.get("/:username", async (req, res) => {
  const fileNames = [];
  fs.readdir(`./files/${req.params.username}`, (err, folder) => {
    if (err) console.log(err);
    else {
      folder.forEach((file, index) => {
        fileNames.push(file);

        // const absolutePath = path.resolve("./files/", file);

        // fs.readFile(absolutePath, "utf8", (err, data) => {
        //   if (err) {
        //     console.error(err);
        //     return;
        //   }
        //   userFiles.push(data);
        //   console.log(file, data);
        // });
        // if (index === folder.length - 1) res.json(fileNames);
      });
      res.json(fileNames);
    }
    console.log(fileNames);
  });
});

router.get("/:username/:filename", async (req, res) => {
  // const absolutePath = path.resolve("./files/", file);

  fs.readFile(
    `./files/${req.params.username}/${req.params.filename}`,
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const file = data.toString();
      console.log(file);
      res.json(file);
    }
  );
});

// writeFile("ziv.txt", JSON.stringify(dummyData));
// await readFile(`${req.params.username}.txt`);
module.exports = router;
