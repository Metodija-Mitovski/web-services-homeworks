const fs = require("./fs");
const books_db = "books.json";

const create = async (bookData) => {
  let data = await fs.read(books_db);
  let id = 1;
  if (data.length !== 0) {
    id = data[data.length - 1].id + 1;
  }

  const book = {
    id,
    title: bookData.title,
    publish_year: bookData.publish_year,
    price: bookData.price,
    author: bookData.author,
    genre: bookData.genre,
  };

  data = [...data, book];

  await fs.write(books_db, data);

  return book;
};

const getAll = async () => {
  const books = await fs.read(books_db);
  return books;
};

const getOne = async (id) => {
  const books = await fs.read(books_db);

  const book = books.filter((b) => b.id === Number(id));

  if (book.length === 0) return null;
  return book[0];
};

const update = async (id, bookData) => {
  let books = await fs.read(books_db);
  let book = books.filter((b) => b.id === Number(id));

  if (book.length === 0) return null;

  let data = books.map((b) => {
    if (b.id === Number(id)) {
      b.title = bookData.title;
      b.publish_year = bookData.publish_year;
      b.price = bookData.price;
      b.author = bookData.author;
      b.genre = bookData.genre;
    }
    return b;
  });

  await fs.write(books_db, data);

  return data;
};

const partialUpdate = async (id, bookData) => {
  const books = await fs.read(books_db);
  let book = books.filter((b) => b.id === Number(id));
  if (book.length === 0) return null;

  let data = books.map((b) => {
    if (b.id === Number(id)) {
      b.title = bookData.title ? bookData.title : b.title;
      b.publish_year = bookData.publish_year ? bookData.publish_year : b.year;
      b.price = bookData.price ? bookData.price : b.price;
      b.author = bookData.author ? bookData.author : b.author;
      b.genre = bookData.genre ? bookData.genre : b.genre;
    }

    return b;
  });

  await fs.write(books_db, data);
  return data;
};

const remove = async (id) => {
  let books = await fs.read(books_db);
  let prevLength = books.length;

  books = books.filter((b) => b.id !== Number(id));
  if (books.length === prevLength) return false;

  await fs.write(books_db, books);

  return true;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  partialUpdate,
  remove,
};
