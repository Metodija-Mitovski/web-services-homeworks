const { Validator } = require("node-input-validator");

const UserSchemaInsert = {
  first_name: "required|minLength:3",
  last_name: "required|minLength:4",
  email: "required|email",
  password: "required|minLength:8",
};

const UserSchemaLogin = {
  email: "required|email",
  password: "required",
};

const validate = async (data, schema) => {
  let sch;

  switch (schema) {
    case "INSERT":
      sch = UserSchemaInsert;
      break;

    case "LOGIN":
      sch = UserSchemaLogin;
      break;

    default:
      break;
  }

  let v = new Validator(data, sch);
  let match = await v.check();

  if (!match) {
    throw v.errors;
  }
};

module.exports = validate;
