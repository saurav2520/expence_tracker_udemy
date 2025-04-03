
const nodemailer = require("nodemailer");


const emailManager = async(to,text,html,subject) => {


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "63663414eb155c",
      pass: "b7e0f9bbd4771c"
    }
  });

  await transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    text:text,
    html:html,
    subject:subject,

  });

};

module.exports = emailManager;