const express = require("express");
const router = express.Router();
const fs = require("fs");

router.put(`/validation`, (req, res) => {
  const { username, password } = req.body;

  console.log("user: " + req.body.username);
  console.log("password: " + req.body.password);
});

module.exports = router;
