const jwt = require("jsonwebtoken");
const config = require("../config");
const cfgSecurity = config.get("security");

const getToken = (data) => {
  return jwt.sign(
    {
      uid: data._id,
      email: data.email,
      full_name: `${data.first_name} ${data.last_name}`,
    },
    cfgSecurity.secret,
    {
      expiresIn: cfgSecurity.token_exp,
    }
  );
};

module.exports = {
  getToken,
};
