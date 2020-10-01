"use strict";
// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Todo, validateTodo } = require("../models/todo");

// Get all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort("title");
    res.json(todos);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get todo by Id
router.get("/todoById/:id", async (req, res) => {
  const { id } = req.params;
  // validate that id has been passed as param
  if (!id) {
    return res.status(400).send("An id value must be included for the search");
  }

  // Validate id matches mongoose type
  const isValidId = isValidObjectdId(id);
  if (!isValidId) {
    return res.status(400).send("The id format is not the correct.");
  }

  try {
    // search for todo by id in db
    const result = await Todo.findById(id);

    // todo not found
    if (!result) {
      return res.status(400).send("No record found with the id given!");
    }
    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create new todo
router.post("/createTodo", async (req, res) => {
  // validate todo props
  const { error } = validateTodo(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // get todo prop values from request
  const { title, isCompleted } = req.body;

  // Check if todo is already in the db
  let todo = await Todo.findOne({ title: title });
  if (todo) {
    return res.status(400).send("The todo submitted is already added");
  }

  // create todo obj for saving in db
  todo = new Todo({
    title,
    isCompleted,
  });

  try {
    // saving todo in db
    const { _id, title, isCompleted } = await todo.save();

    const savedTodo = {
      id: _id,
      title,
      isCompleted,
      message: "The todo was successfully added",
    };
    // send message after saving successfully
    res.json(savedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deletes todo
router.delete("/deleteTodo/:id", async (req, res) => {
  const { id } = req.params;
  // validate that id has been passed as param
  if (!id) {
    return res.status(400).send("An id value must be included for the search");
  }

  // Validate id matches mongoose type
  const isValidId = isValidObjectdId(id);
  if (!isValidId) {
    return res.status(400).send("The id format is not the correct.");
  }

  try {
    //find todo with the specific id and remove it from db
    const result = await Todo.findByIdAndRemove(id);
    console.log("result deleting: ", result);
    // if id passed is not in db
    if (!result) {
      return res.status(400).send("The todo with the given ID was not found");
    }

    const deletedTodo = {
      id: result._id,
      title: result.title,
      isCompleted: result.isCompleted,
      message: "The todo was successfully deleted.",
    };
    res.json(deletedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// utils functions
const isValidObjectdId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = router;
