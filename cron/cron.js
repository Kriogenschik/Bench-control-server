const nodemailer = require("nodemailer");
const cron = require("node-cron");
const config = require("./config");
const { getBlankProjectsList, getStaffListByTimeZone, getUserEmailsArr } = require("./helpers");
const { createTemplate } = require("./template");

const sendMailToUsers = async (emails, projectsList, staffList) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: `Bench Control Project <${config.emailUser}>`,
    to: emails,
    subject: "Bench Control Project daily notification",
    html: createTemplate(projectsList, staffList),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail has been sent: ", info.response);
    }
  });
};

const sendMail = () => {
  try {
    cron.schedule("00 09 * * 1-5", async function () {
      const emails = await getUserEmailsArr();
      const projects = await getBlankProjectsList();
      const staff = await getStaffListByTimeZone();
      if ((projects && projects.length > 0) || (staff && staff.length > 0)) {
        sendMailToUsers(emails, projects, staff);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };
