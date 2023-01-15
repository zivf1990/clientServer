const fs = require("fs");

const fileSys = {
  readFile: (filePath, cb) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      cb(data);
    });
  },
};

module.exports = fileSys;
