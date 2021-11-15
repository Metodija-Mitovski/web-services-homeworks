require("./pkg/db");
const express = require("express");
const jwt = require("express-jwt");
const handlers = require("./handlers/articles");
const config = require("./pkg/config");
const api = express();

let cfgSecurity = config.get("security");
let cfgApp = config.get("app");

api.use(express.json());

api.use(
  jwt({
    secret: cfgSecurity.secret,
    algorithms: cfgSecurity.algorithms,
  })
);

api.post("/articles", handlers.create);
api.get("/articles", handlers.getAll);
api.get("/articles/me", handlers.getMine);
api.get("/articles/:id", handlers.getOne);
api.put("/articles/:id", handlers.update);
api.patch("/articles/:id", handlers.patrialUpdate);
api.delete("/articles/:id", handlers.remove);

api.listen(cfgApp.port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started on port ${cfgApp.port}`);
});
