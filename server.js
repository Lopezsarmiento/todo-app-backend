"use strict";
// Dependencies
const express = require("express");
const cors = require("cors");
const connectDB = require("./startup/db");
const todos = require("./routes/todos");
const home = require("./routes/home");
const app = express();

// local variables
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

//Routes
app.use("/api", todos);
app.use("/", home);

// start db
connectDB();

// start server
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
