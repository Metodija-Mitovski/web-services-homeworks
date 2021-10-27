const clearEmptySpace = (data) => {
  for (element in data) {
    if (typeof data[element] === "string") {
      data[element] = data[element].trim();
    }
  }
};

module.exports = {
  clearEmptySpace,
};
