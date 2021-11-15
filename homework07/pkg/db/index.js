const mongoose = require("mongoose");
const config = require("../config");
let cfgDB = config.get("db");

//connection string
let dsn = `mongodb+srv://${cfgDB.username}:${cfgDB.password}@${cfgDB.host}/${cfgDB.dbname}?retryWrites=true&w=majority`;

mongoose.connect(
  dsn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.log("Could not connect to db:", err);
    }
    console.log("Succesfully connected to db");
  }
);
