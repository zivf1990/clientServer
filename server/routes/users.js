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

const readFile = (filePath, cb) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    cb(data);
  });
};

const getStats = (fileOrFolderPath, cb) => {
  fs.stat(fileOrFolderPath, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    cb({ isAFile: stats.isFile(), size: stats.size });
  });
};

// readFile(`./files/ziv/file1.txt`, (data) => {
// });

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
  readFolder(`./files/${req.params.username}`, (items) => {
    console.log(items);
    res.json(items);
  });
});

const readFolder = (folderPath, cb) => {
  console.log("readFolder()");
  const fileNames = [];

  fs.readdir(folderPath, (err, folder) => {
    if (err) {
      console.log(err);
      return;
    }

    folder.forEach((item, index) => {
      getStats(folderPath + "/" + item, ({ isAFile, size }) => {
        fileNames.push({ name: item, isAFile: isAFile, size: size });
        if (index === folder.length - 1) {
          cb(fileNames);
        }
      });
    });
  });
};

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
    }
    //Directory.
    else if (stats.isDirectory()) {
      const fileNames = [];
      fs.readdir(`./files/${req.params.username}`, (err, folder) => {
        if (err) console.log(err);
        else {
          folder.forEach((file, index) => {
            fileNames.push(file);
          });
          res.json(fileNames);
        }
        console.log(fileNames);
      });
    }
  });
});

// writeFile("ziv.txt", JSON.stringify(dummyData));
// await readFile(`${req.params.username}.txt`);
module.exports = router;
