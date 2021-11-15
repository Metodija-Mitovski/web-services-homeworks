const { Validator } = require("node-input-validator");

const ArticleCreate = {
  title: "required|minLength:4",
  content: "required|minLength:10",
  publish_date: "required",
};

const ArticleUpdate = {
  title: "minLength:5",
  content: "minLength:10",
};

const validate = async (data, schema) => {
  let sch;

  switch (schema) {
    case "CREATE":
      sch = ArticleCreate;
      break;

    case "INSERT":
      sch = ArticleUpdate;

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
