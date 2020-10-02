"use strict";
// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Todo, validateTodo } = require("../models/todo");
const { messages, routes } = require("../constants/messages.json");

// Get all todos
router.get(routes.getTodos, async (req, res) => {
  try {
    const todos = await Todo.find().sort("title");
    res.json(todos);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get todo by Id
router.get(routes.getTodoById, async (req, res) => {
  const { id } = req.params;
  // validate that id has been passed as param
  if (!id) {
    return res.status(400).send(messages.missingId);
  }

  // Validate id matches mongoose type
  const isValidId = isValidObjectdId(id);
  if (!isValidId) {
    return res.status(400).send(messages.idFormat);
  }

  try {
    // search for todo by id in db
    const result = await Todo.findById(id);

    // todo not found
    if (!result) {
      return res.status(400).send(messages.recordNotFound);
    }
    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create new todo
router.post(routes.createTodo, async (req, res) => {
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
    return res.status(400).send(messages.recordAlreadyInDb);
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
      message: messages.recordAdded,
    };
    // send message after saving successfully
    res.json(savedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete todo
router.delete(routes.deleteTodo, async (req, res) => {
  const { id } = req.params;
  // validate that id has been passed as param
  if (!id) {
    return res.status(400).send(messages.missingId);
  }

  // Validate id matches mongoose type
  const isValidId = isValidObjectdId(id);
  if (!isValidId) {
    return res.status(400).send(messages.idFormat);
  }

  try {
    //find todo with the specific id and remove it from db
    const result = await Todo.findByIdAndRemove(id);
    // if id passed is not in db
    if (!result) {
      return res.status(400).send(messages.recordNotFound);
    }

    const deletedTodo = {
      id: result._id,
      title: result.title,
      isCompleted: result.isCompleted,
      message: messages.recordDeleted,
    };
    res.json(deletedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update todo
router.put(routes.updateTodo, async (req, res) => {
  // validate todo props
  const { error } = validateTodo(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const { id, title, isCompleted } = req.body;
    // look for todo in db and update
    const result = await Todo.findByIdAndUpdate(id, {
      title,
      isCompleted,
    });

    // todo not found by id
    if (!result) {
      return res.status(400).send(messages.recordNotFound);
    }

    const updatedTodo = {
      id: result._id,
      title: result.title,
      isCompleted: result.isCompleted,
      message: messages.recordUpdated,
    };
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// utils functions
const isValidObjectdId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = router;
