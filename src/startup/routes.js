const fs = require("fs");
const path = require("node:path");
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

  app.get("/videos/:id", function (req, res) {
    const videoId = req.params.id;
    const [videoDir, videoName] = videoId.split("_");
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }
    const videoPath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      "videos",
      videoDir,
      videoName
    );
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 100 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  });

  app.get("/vtts/:id", function (req, res) {
    const vttId = req.params.id;
    const [vttDir, vttName] = vttId.split("_");

    const vttPath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      "vtts",
      vttDir,
      vttName
    );
    fs.readFile(vttPath, (err, vtt) => {
      if (err) throw err;
      res.send(vtt);
    });
  });
};
