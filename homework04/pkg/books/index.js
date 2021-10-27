const Book = require("./mongo");

const create = async (bookData) => {
  const b = new Book(bookData);
  await b.save();
  return b;
};

const getAll = async () => {
  const books = await Book.find({});
  return books;
};

const getOne = async (id) => {
  const b = await Book.find({ _id: id });
  if (b.length > 0) return b[0];
  return false;
};

const update = async (id, bookData) => {
  return await Book.updateOne({ _id: id }, bookData);
};

const partialUpdate = async (id, bookData) => {
  return await Book.updateOne({ _id: id }, bookData);
};

const remove = async (id) => {
  return await Book.deleteOne({ _id: id });
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  partialUpdate,
  remove,
};
