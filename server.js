"use strict";
// Dependencies
const express = require("express");
const todos = require("./routes/todos");
const home = require("./routes/home");
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", todos);
app.use("/", home);

// start server
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
