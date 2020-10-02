"use strict";
const mongoose = require("mongoose").set("debug", true);
const Joi = require("joi");

// Create schema/template for todo obj
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  isCompleted: Boolean,
});

// compile schema into Todo module
const Todo = mongoose.model("Todo", todoSchema);
//Todo.id = new mongoose.Types.ObjectId();

// validate props using Joi
const validateTodo = (todo) => {
  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().min(3).max(30).required(),
    isCompleted: Joi.boolean().required(),
  });

  return schema.validate(todo);
};

module.exports = {
  Todo,
  validateTodo,
};
