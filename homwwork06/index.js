require("./pkg/db");
const express = require("express");
const jwt = require("express-jwt");
const handlers = require("./handlers/articles");
const api = express();

api.use(express.json());

api.use(
  jwt({
    secret: "secretpassword",
    algorithms: ["HS256"],
  })
);

api.post("/articles", handlers.create);
api.get("/articles", handlers.getAll);
api.get("/articles/me", handlers.getMine);
api.get("/articles/:id", handlers.getOne);
api.put("/articles/:id", handlers.update);
api.patch("/articles/:id", handlers.patrialUpdate);
api.delete("/articles/:id", handlers.remove);

api.listen(10002, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started on port 10002");
});
