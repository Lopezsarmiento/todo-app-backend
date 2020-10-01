"use strict";
const mongoose = require("mongoose");
const config = require("../config/dev.json");

const uri = config.uri;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error when connecting to DB: , ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
