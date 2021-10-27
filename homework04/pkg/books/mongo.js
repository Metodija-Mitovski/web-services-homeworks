const mongoose = require("mongoose");

const Book = mongoose.model(
  "books",
  {
    title: String,
    publish_year: Number,
    price: Number,
    author: String,
    genre: String,
  },
  "books"
);

module.exports = Book;
