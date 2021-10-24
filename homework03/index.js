const express = require("express");
const api = express();
api.use(express.json());

const car_handlers = require("./car_handlers");
const book_hanlders = require("./book_handlers");

// cars
api.post("/cars", car_handlers.create);

api.get("/cars", car_handlers.getAll);

api.get("/cars/:id", car_handlers.getOne);

api.put("/cars/:id", car_handlers.update);

api.patch("/cars/:id", car_handlers.partialUpdate);

api.delete("/cars/:id", car_handlers.remove);

// books
api.post("/books", book_hanlders.create);

api.get("/books", book_hanlders.getAll);

api.get("/books/:id", book_hanlders.getOne);

api.put("/books/:id", book_hanlders.update);

api.patch("/books/:id", book_hanlders.partialUpdate);

api.delete("/books/:id", book_hanlders.remove);

api.listen(10000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Services started on port 10000");
});
