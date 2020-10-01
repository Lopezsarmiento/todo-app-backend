"use strict";
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  isCompleted: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
};
