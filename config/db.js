//The connection is established using the MongoDB URL specified in the `mongoURL` environment variable.
const mongoose = require("mongoose");
require("dotenv").config();

// The MongoDB connection object created using Mongoose
const connection = mongoose.connect(process.env.mongoURL);

module.exports = { connection };
