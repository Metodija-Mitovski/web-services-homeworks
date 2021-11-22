const validator = require("../pkg/users/validate");
const bcrypt = require("bcryptjs");
const user = require("../pkg/users");
const mailer = require("../pkg/mailer");
const security = require("../pkg/security");
const config = require("../pkg/config");

const cfgApp = config.get("app");
const cfgMail = config.get("mailer");

const login = async (req, res) => {
  try {
    await validator(req.body, "LOGIN");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Bad request");
  }

  try {
    let u = await user.getByEmail(req.body.email);

    if (!u) {
      return res.status(400).send("Bad request");
    }

    if (!bcrypt.compareSync(req.body.password, u.password)) {
      return res.status(400).send("Bad request. Wrong password");
    }

    if (!u.verified) {
      return res.status(400).send("Verify your account");
    }

    const token = security.getToken(u);

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const validate = (req, res) => {
  res.status(200).send(`Hello ${req.user.full_name}`);
};

const createAccount = async (req, res) => {
  try {
    await validator(req.body, "CREATE");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    let data = req.body;
    data.password = bcrypt.hashSync(data.password);
    let u = await user.create(data);
    let token = security.getToken(u);

    await mailer.sendMail([u.email], "VERIFY", {
      first_name: u.first_name,
      last_name: u.last_name,
      url: `${cfgMail.acc_verify_url}/${token}`,
    });

    return res
      .status(201)
      .send(
        "Account created succesfully. Please check your email to verify your account"
      );
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send("Bad request, Email alrady in use");
    }
    res.status(500).send(error);
  }
};

const verifyAccount = async (req, res) => {
  try {
    const u = await user.update(req.user.uid, { confirmed: true });

    if (!u.matchedCount) {
      return res.status(404).send("Not found");
    }
    return res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const resendVerification = async (req, res) => {
  try {
    const u = await user.getByEmail(req.query.email);
    if (!u) {
      return res.status(404).send("Not found");
    }

    const token = security.getToken(u);

    mailer.sendMail([u.email], "VERIFY", {
      first_name: u.first_name,
      last_name: u.last_name,
      url: `${cfgMail.acc_verify_url}/${token}`,
    });

    res.status(200).send("Verification email sent");
  } catch (error) {
    res.status(500).send(error);
  }
};

const forgotPassword = () => {};

const resetPassword = () => {};

const renew = (req, res) => {};

module.exports = {
  login,
  validate,
  createAccount,
  forgotPassword,
  resetPassword,
  renew,
  verifyAccount,
  resendVerification,
};
