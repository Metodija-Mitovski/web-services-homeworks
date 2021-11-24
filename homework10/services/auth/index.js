require("../../pkg/db");
const express = require("express");
const jwt = require("express-jwt");
const handlers = require("./handlers/auth");
const config = require("../../pkg/config");

const api = express();

api.use(express.json());
api.use(
  jwt({
    secret: config.get("security").secret,
    algorithms: config.get("security").algorithms,
  }).unless({
    path: ["/api/v1/auth/login", "/api/v1/auth/create-account"],
  })
);

api.post("/api/v1/auth/login", handlers.login);
api.get("/api/v1/auth/validate", handlers.validate);
api.post("/api/v1/auth/renew-jwt", handlers.renew);
api.post("/api/v1/auth/create-account", handlers.createAccount);
api.post("/api/v1/auth/forgot-passowrd", handlers.forgotPassword);
api.post("/api/v1/auth/reset-passowrd", handlers.resetPassword);
api.patch("/api/v1/auth/verify", handlers.verifyAccount);

api.listen(config.get("services").auth.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(
    `Server succesfully started on port ${config.get("services").auth.port}`
  );
});
