"use strict";
// Dependencies
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //res.sendFile(path.join(`${__dirname}index.html`));
  res.sendFile(path.join(`./public/index.html`));
});

module.exports = router;
