const users = require("../pkg/users");

const getByName = async (req, res) => {
  try {
    let user = await users.getUser(req.params.name);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getByName,
};
