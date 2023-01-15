const express = require("express");
const router = express.Router();
const { readFile } = require("../public/javascripts/fileSys");

router.put(`/validation`, (req, res) => {
  const { username, password } = req.body;

  console.log("validation user: " + username);
  console.log("validation password: " + password);

  readFile(`./files/users.json`, async (data) => {
    const users = await JSON.parse(data);
    console.log("validation ", users);

    const user = users.find((user) => user.username === username);
    console.log("validation ", user);

    user?.password === password ? res.send(true) : res.send(false);
  });
});

module.exports = router;
