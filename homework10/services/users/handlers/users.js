const user = require("../../../pkg/users");

const getUser = async (req, res) => {
  try {
    const u = await user.getByID(req.user.uid);
    if (!u) {
      return res.status(404).send();
    }

    res.status(200).send(u);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getUser,
};
