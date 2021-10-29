const users = require("../pkg/users");
const validate_data = require("../pkg/users/validator");
const util = require("./utils");

const createAccount = async (req, res) => {
  util.clearWhiteSpace(req.body);

  try {
    await validate_data(req.body, "INSERT");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    const user = await users.create(req.body);

    if (!user) {
      return res.status(403).send("Email already in use");
    }

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  util.clearWhiteSpace(req.body);
  try {
    await validate_data(req.body, "LOGIN");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    const user = await users.login(req.body);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    res.status(200).send("Login success");
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
