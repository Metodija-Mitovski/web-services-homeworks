const clearWhiteSpace = (data) => {
  for (let key in data) {
    if (typeof data[key] === "string") {
      data[key] = data[key].trim();
    }
  }
};

module.exports = {
  clearWhiteSpace,
};
