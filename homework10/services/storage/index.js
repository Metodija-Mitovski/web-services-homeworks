const express = require("express");
const fileUpload = require("express-fileupload");
const jwt = require("express-jwt");
const handlers = require("./handlers/storage");
const config = require("../../pkg/config");

const api = express();

api.use(
  jwt({
    algorithms: config.get("security").algorithms,
    secret: config.get("security").secret,
  })
);
api.use(fileUpload());

api.post("/api/v1/storage", handlers.upload);
api.get("/api/v1/storage", handlers.getFileList);
api.get("/api/v1/storage/:filename", handlers.download);
api.delete("/api/v1/storage/:filename", handlers.removeFile);

api.listen(config.get("services").storage.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(
    `Server successfuly started on port ${config.get("services").storage.port}`
  );
});
