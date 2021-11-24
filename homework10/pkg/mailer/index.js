const fs = require("fs");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const config = require("../config");
const cfgMailer = config.get("mailer");

const mailTepmaltes = {
  WELCOME: {
    title: "Welcome to THE website!",
    template: "welcome.html",
  },
  VERIFY: {
    title: "Verify your acccount",
    template: "verify_account.html",
  },
  PASSWORD_RESET: {
    title: "You requested a password reset",
    template: "reset_password.html",
  },
};

const sendMail = async (to, type, data) => {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: cfgMailer.key,
  });

  let title = "";
  let content = "";

  if (mailTepmaltes[type]) {
    // define email title
    title = mailTepmaltes[type].title;

    //define email content
    let templatePath = `${__dirname}/../../email_templates/${mailTepmaltes[type].template}`;
    content = await getTemplate(templatePath);

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
    console.log(error);
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
