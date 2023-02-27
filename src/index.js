const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
require("./startup/routes")(app);

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost/langland")
  .then(() => console.log("Connected to mongoDB..."))
  .catch(() => console.log("Connecting to mongoDB failed."));

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}...`);
});
