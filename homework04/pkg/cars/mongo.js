const mongoose = require("mongoose");

const Car = mongoose.model(
  "cars",
  {
    manufacturer: String,
    model: String,
    year: Number,
    engine: Number,
    hp: Number,
    fuel: String,
  },
  "cars"
);

module.exports = Car;
