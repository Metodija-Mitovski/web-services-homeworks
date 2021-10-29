const { Validator } = require("node-input-validator");

const BookSchemaInsert = {
  title: "required|minLength:3",
  publish_year: "required",
  price: "required|between:0,1000",
  author: "required|minLength:3",
  genre: "required|minLength:4",
};

const BookSchemaUpdate = {
  title: "minLength:3",
  author: "minLength:3",
  genre: "minLength:4",
  price: "between:0,1000",
};

const validate = async (data, schema = "INSERT") => {
  let sch;

  switch (schema) {
    case "INSERT":
      sch = BookSchemaInsert;
      break;
    case "UPDATE":
      sch = BookSchemaUpdate;
      break;
  }

  let v = new Validator(data, sch);
  let e = await v.check();

  if (!e) {
    throw v.errors;
  }
};

module.exports = validate;
