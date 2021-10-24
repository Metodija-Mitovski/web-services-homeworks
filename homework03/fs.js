const fs = require("fs");

const read = (fileName) => {
  return new Promise((success, fail) => {
    fs.readFile(fileName, (err, data) => {
      if (err) return fail(err);
      data = JSON.parse(data);
      return success(data);
    });
  });
};

const write = (fileName, data) => {
  return new Promise((success, fail) => {
    data = JSON.stringify(data);
    fs.writeFile(fileName, data, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

module.exports = {
  read,
  write,
};
