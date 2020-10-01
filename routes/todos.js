"use strict";
// Dependencies
const express = require("express");
const router = express.Router();

const todos = [
  {
    id: "12345",
    title: "wash dishes",
    completed: false,
  },
  {
    id: "56789",
    title: "buy milk",
    completed: false,
  },
  {
    id: "13579",
    title: "pay bills",
    completed: false,
  },
];

router.get("/todos", (req, res) => {
  res.json(todos);
});

module.exports = router;
