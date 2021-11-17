const express = require("express");

const api = express();
const users = require("./handlers/users");

api.get("/users/:name", users.getByName);

api.listen(10000, (err) => {
  if (err) {
    return console.log("Could not start server", err);
  }

  console.log("Server started at port 10000");
});
