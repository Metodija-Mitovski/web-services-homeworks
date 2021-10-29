const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
  },
  "users"
);

const create = async (data) => {
  const exist = await User.findOne({ email: data.email });
  if (exist) {
    return false;
  }

  const u = new User(data);
  return await u.save();
};

const login = async (data) => {
  const u = await User.findOne({ email: data.email });

  if (u && data.password === u.password) {
    return u;
  }

  return false;
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
