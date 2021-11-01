const { Validator } = require("node-input-validator");

const CarSchemaInsert = {
  manufacturer: "required|minLength:3|string",
  model: "required|minLength:2|string",
  year: "required|integer",
  engine: "required|integer",
  hp: "required|integer",
  fuel: "required|string",
};

const CarSchemaUpdate = {
  manufacturer: "minLength:3|string",
  model: "minLength:2|string",
  year: "integer",
  engine: "integer",
  hp: "integer",
  fuel: "string",
};

const validate = async (data, schema = "INSERT") => {
  let sch;

  switch (schema) {
    case "INSERT":
      sch = CarSchemaInsert;
      break;
    case "UPDATE":
      sch = CarSchemaUpdate;
      break;
  }

  let v = new Validator(data, sch);
  let e = await v.check();

  if (!e) {
    throw v.errors;
  }
};

module.exports = validate;
