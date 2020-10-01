"use strict";
// Dependencies
const express = require("express");
const router = express.Router();
const { Todo } = require("../models/todo");

router.get("/todos", (req, res) => {
  res.json(todos);
});

router.post("/createTodo", async (req, res) => {
  let todo = new Todo({
    id: "13579",
    title: "brush teeth",
    isCompleted: false,
  });

  await todo.save();

  res.send("saved ok");

  // TODO ->
  // GET VALUES FOR REQ.BODY AND SAVE TODO
});

module.exports = router;
