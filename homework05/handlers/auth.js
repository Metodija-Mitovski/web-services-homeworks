const users = require("../pkg/users");
const validate_data = require("../pkg/users/validator");
const sanitaze = require("../pkg/sanitizers/sanitizers");

const createAccount = async (req, res) => {
  sanitaze.clearWhiteSpace(req.body);

  try {
    await validate_data(req.body, "INSERT");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    const u = await users.create(req.body);

    return res.status(201).send(u);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send("Bad request, email alraedy in use");
    }
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  sanitaze.clearWhiteSpace(req.body);
  try {
    await validate_data(req.body, "LOGIN");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    const u = await users.login(req.body.email, req.body.password);
    if (!u) {
      return res.status(400).send("Bad request");
    }

    return res.status(200).send("Login success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const validate = async (req, res) => {};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = {
  login,
  validate,
  createAccount,
  forgotPassword,
  resetPassword,
};
