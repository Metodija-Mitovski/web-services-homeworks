const mongoose = require("mongoose");

const Article = mongoose.model(
  "articles",
  {
    title: String,
    content: String,
    tags: [String],
    publish_date: Date,
    author_id: String,
  },
  "articles"
);

const create = async (data) => {
  let a = new Article(data);
  return await a.save();
};

const getOne = async (id) => {
  return await Article.findById(id);
};

const getAllByUser = async (uid) => {
  return await Article.find({ author_id: uid });
};

const getAll = async () => {
  return await Article.find({});
};

const update = async (id, uid, data) => {
  return await Article.updateOne({ _id: id, author_id: uid }, data);
};

const partialUpdate = async (id, uid, data) => {
  return await Article.updateOne({ _id: id, author_id: uid }, data);
};

const remove = async (id, uid) => {
  return await Article.deleteOne({ _id: id, author_id: uid });
};

module.exports = {
  create,
  getOne,
  getAllByUser,
  getAll,
  update,
  partialUpdate,
  remove,
};
