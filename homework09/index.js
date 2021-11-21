require("./pkg/db");
const express = require("express");
const jwt = require("express-jwt");
const handlers = require("./handlers/auth");
const config = require("./pkg/config");

const cfgSecurity = config.get("security");
const cfgApp = config.get("app");

const api = express();
api.use(express.json());

api.use(
  jwt({
    secret: cfgSecurity.secret,
    algorithms: cfgSecurity.algorithms,
  }).unless({
    path: ["/auth/login", "/auth/create-account", "/auth/verify"],
  })
);

api.post("/auth/login", handlers.login);
api.get("/auth/validate", handlers.validate);
api.get("/auth/verify", handlers.verifyAccount);
api.post("/auth/renew-jwt", handlers.renew);
api.post("/auth/create-account", handlers.createAccount);
api.post("/auth/forgot-passowrd", handlers.forgotPassword);
api.post("/auth/reset-passowrd", handlers.resetPassword);

api.listen(cfgApp.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Services running on port ${cfgApp.port}`);
});
