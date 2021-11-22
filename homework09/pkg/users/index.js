const mongoose = require("mongoose");

const User = mongoose.model(
  "users", // schema name
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  "users" // collection name
);

const create = async (data) => {
  let u = new User(data);
  return await u.save();
};

const getByID = async (id) => {
  return await User.findById(id);
};

const getByEmail = async (email) => {
  return await User.findOne({ email });
};

const getAll = async () => {
  return await User.find({});
};

const update = async (id, data) => {
  return await User.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await User.deleteOne({ _id: id });
};

module.exports = {
  create,
  getByID,
  getAll,
  update,
  remove,
  getByEmail,
};
