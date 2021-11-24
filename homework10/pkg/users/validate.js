const { Validator } = require("node-input-validator");

const AccountCreate = {
  first_name: "required|minLength:3",
  last_name: "required|minLength:4",
  email: "required|email",
  password: "required",
};

const Login = {
  email: "required|email",
  password: "required",
};

const validate = async (data, schema) => {
  let sch;

  switch (schema) {
    case "CREATE":
      sch = AccountCreate;
      break;
    case "LOGIN":
      sch = Login;
      break;

    default:
      break;
  }

  let v = new Validator(data, sch);
  let e = await v.check();

  if (!e) {
    throw v.errors;
  }
};

module.exports = validate;
