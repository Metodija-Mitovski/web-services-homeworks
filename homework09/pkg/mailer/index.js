const fs = require("fs");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const config = require("../config");
const tepmlateTypes = require("./template_types");

const cfgMailer = config.get("mailer");

const sendMail = async (to, type, data) => {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: cfgMailer.username,
    key: cfgMailer.key,
  });

  let title = "";
  let content = "";

  if (tepmlateTypes[type]) {
    title = tepmlateTypes[type].title;

    let template_path = `${__dirname}/../../email_templates/${tepmlateTypes[type].template}`;
    content = await getTemplate(template_path);

    for (let i in data) {
      let regex = new RegExp(`\{\{${i}\}\}`, "g");
      content = content.replace(regex, data[i]);
    }
  }

  const options = {
    from: cfgMailer.default_address,
    to: to,
    subject: title,
    html: content,
  };

  try {
    let res = await mg.messages.create(cfgMailer.domain, options);
    console.log(res);
  } catch (error) {
    console.log(err);
  }
};

const getTemplate = (path) => {
  return new Promise((success, fail) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
};

module.exports = {
  sendMail,
};
