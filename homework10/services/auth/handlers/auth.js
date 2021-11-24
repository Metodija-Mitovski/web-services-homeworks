const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("../../../pkg/users/validate");
const user = require("../../../pkg/users");
const config = require("../../../pkg/config");
const mailer = require("../../../pkg/mailer");

const login = async (req, res) => {
  try {
    await validator(req.body, "LOGIN");
  } catch (err) {
    console.log(err);
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
    // create JWT
    let token = jwt.sign(
      {
        uid: u._id,
        email: u.email,
        full_name: `${u.first_name} ${u.last_name}`,
        exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000),
      },
      config.get("security").secret
    );
    res.status(200).send(token);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const validate = (req, res) => {
  res.status(200).send("ok");
};

// Оваа функција
const createAccount = async (req, res) => {
  try {
    await validator(req.body, "CREATE");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Bad request");
  }

  try {
    let data = req.body;
    data.password = bcrypt.hashSync(data.password);
    let u = await user.create(data);
    const token = jwt.sign(
      {
        uid: u._id,
        email: u.email,
        full_name: `${u.first_name} ${u.last_name}`,
        exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000),
      },
      config.get("security").secret
    );

    mailer.sendMail([u.email], "VERIFY", {
      first_name: u.first_name,
      last_name: u.last_name,
      url: `http://localhost:${
        config.get("services").proxy
      }/auth/verify/${token}`,
    });

    return res
      .status(201)
      .send("Account created, check your email to verify your account");
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).send("Bad request. Email already in use");
    }
    return res.status(500).send("Internal server error");
  }
};

const verifyAccount = async (req, res) => {
  try {
    const u = await user.update(req.user.uid, { verified: true });

    if (!u.matchedCount) {
      return res.status(404).send("Not found");
    }
    return res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const forgotPassword = (req, res) => {
  res.send("ok");
};

const resetPassword = (req, res) => {
  res.send("ok");
};

const renew = (req, res) => {
  let token = jwt.sign(
    {
      uid: req.user.uid,
      email: req.user.email,
      full_name: req.user.full_name,
      exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000),
    },
    config.get("security").secret
  );
  res.status(200).send(token);
};

module.exports = {
  login,
  validate,
  createAccount,
  forgotPassword,
  resetPassword,
  renew,
  verifyAccount,
};
