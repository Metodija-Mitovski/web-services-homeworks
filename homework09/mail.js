const mailer = require("./pkg/mailer");
// const main = async () => {
//   try {
//     await mailer.sendMail(["m.mitovski93@gmail.com"], "VERIFY", {
//       first_name: "Pero",
//       last_name: "Perovski",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// main();

mailer.sendMail(["m.mitovski93@gmail.com"], "VERIFY", {
  first_name: "Pero",
  last_name: "Perovski",
});
