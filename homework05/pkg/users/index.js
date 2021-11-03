const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },

    password: String,
  },
  "users"
);

const create = async (data) => {
  const u = new User(data);
  return await u.save();
};

const login = async (email, password) => {
  return await User.findOne({ email, password });
};

const getByID = async () => {};

const getAll = async () => {};

const update = async () => {};

const remove = async () => {};

module.exports = {
  create,
  login,
  getByID,
  getAll,
  update,
  remove,
};
