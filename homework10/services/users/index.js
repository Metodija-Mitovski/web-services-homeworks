require("../../pkg/db");
const express = require("express");
const jwt = require("express-jwt");
const config = require("../../pkg/config");
const handlers = require("./handlers/users");

const api = express();
api.use(express.json());
api.use(
  jwt({
    secret: config.get("security").secret,
    algorithms: config.get("security").algorithms,
  })
);

api.get("/api/v1/users", handlers.getUser);

api.listen(config.get("services").users.port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started at port ${config.get("services").users.port} `);
});
