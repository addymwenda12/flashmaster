import nodemailer from 'nodemailer';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

/* CONFIGURATION */
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* FUNCTIONS TO SEND EMAIL NOTIFICATIONS */
async function sendEmailNotification(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}

/* SCHEDULED TASK TO SEND EMAIL NOTIFICATIONS */
function scheduleNotifications(cronExpression, callback) {
  cron.schedule(cronExpression, callback);
}

export default {
  sendEmailNotification,
  scheduleNotifications,
};