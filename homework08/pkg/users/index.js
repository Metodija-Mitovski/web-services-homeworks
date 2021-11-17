const fetch = require("node-fetch");
const cache = {};

const getUser = async (name) => {
  try {
    let url = `https://api.github.com/users/${name}`;
    if (cache[name] && cache[name].ts + 10000 > new Date().getTime()) {
      return cache[name].data;
    }

    let res = await fetch(url);
    let data = await res.json();
    cache[name] = {
      ts: new Date().getTime(),
      data,
    };

    return data;
  } catch (error) {
    throw new Error("could not fetch user");
  }
};

module.exports = {
  getUser,
};
