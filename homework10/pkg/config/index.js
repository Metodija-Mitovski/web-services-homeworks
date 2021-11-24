const fs = require("fs");

const confilgFile = `${__dirname}/../../config.json`;
let config = null;

if (!config) {
  let cf = fs.readFileSync(confilgFile, "utf-8");
  config = JSON.parse(cf);
}

const get = (section) => {
  if (config[section]) {
    return config[section];
  }
  return null;
};

module.exports = {
  get,
};
