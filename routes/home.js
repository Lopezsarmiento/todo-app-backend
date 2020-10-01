"use strict";
// Dependencies
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to todo app backend. Next will add some instructions here");
});

module.exports = router;
