const mongoose = require("mongoose");

let username = "dev";
let dbname = "semosdb";

let dsn = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(
  dsn,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log("Could not connect to db", err);
    console.log("Succesfully connected to db");
  }
);
