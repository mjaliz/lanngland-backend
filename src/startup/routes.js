const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const users = require("../routes/users");

module.exports = function (app) {
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());

  if (app.get("env") === "development") {
    app.use(morgan("dev"));
  }

  app.use("/users", users);
  app.get("/test", (req, res) => {
    res.send("hello");
  });
};
