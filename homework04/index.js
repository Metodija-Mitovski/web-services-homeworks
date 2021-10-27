require("./pkg/db/index");
const express = require("express");
const cars = require("./handlers/cars");
const books = require("./handlers/books");

const api = express();

api.use(express.json());

//cars
api.post("/cars", cars.create);
api.get("/cars", cars.getAll);
api.get("/cars/:id", cars.getOne);
api.put("/cars/:id", cars.update);
api.patch("/cars/:id", cars.partialUpdate);
api.delete("/cars/:id", cars.remove);

//books
api.post("/books", books.create);
api.get("/books", books.getAll);
api.get("/books/:id", books.getOne);
api.put("/books/:id", books.update);
api.patch("/books/:id", books.partialUpdate);
api.delete("/books/:id", books.remove);

api.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("services started at port 3000");
});
